const client = require("../services/tmi")
const UserModel = require("../models/User")
const prettyMilliseconds = require("pretty-ms")

client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({ twitch_id: tags["user-id"] })
    if (!user) return
    if (!user.afk?.time) return
    
    const time = prettyMilliseconds(Date.now() - user.afk.time)
    var output = null

    const afkType = (type) => {
        const source = {
            brb: `${tags.username} voltou: ${user.afk.message} (${time})`,
            gn: `${tags.username} acordou: ${user.afk.message} (${time})`,
            afk: `${tags.username} voltou de seu AFK: ${user.afk.message} (${time})`,
            workout: `${tags.username} acabou de malhar: ${user.afk.message} (${time})`,
            code: `${tags.username} terminou de programar: ${user.afk.message} (${time})`,
            work: `${tags.username} voltou do trabalho: ${user.afk.message} (${time})`,
            study: `${tags.username} terminou de estudar: ${user.afk.message} (${time})`,
            read: `${tags.username} terminou de ler: ${user.afk.message} (${time})`,
            food: `${tags.username} está com a barriga cheia: ${user.afk.message} (${time})`,
            fuck: `${tags.username} terminou a sua foda: ${user.afk.message} (${time})`,
            shower: `${tags.username} acaba de se banhar: ${user.afk.message} (${time})`,
        }
        output = source[type]
        return output
    }

    afkType(user.afk._type)
    await client.say(channel, output)

    user.afk = undefined
    user.save()
})