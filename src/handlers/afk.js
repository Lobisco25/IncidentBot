const client = require("../services/tmi")
const UserModel = require("../models/User")
const prettyMilliseconds = require("pretty-ms")

client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({twitch_id: tags["user-id"]})
    if(!user) return
    if(!user.afk?.time) return


    const time = prettyMilliseconds(Date.now() - user.afk.time)
    
    var output = null
    switch (user.afk._type) {
        case "afk":
            output = `${tags.username} voltou de seu AFK: ${user.afk.message} (${time})`
            break
        case "study":
            output = `${tags.username} terminou de estudar: ${user.afk.message} (${time})`
            break
        case "code":
            output = `${tags.username} terminou de programar: ${user.afk.message} (${time})`
            break
        case "gn":
            output = `${tags.username} acordou: ${user.afk.message} (${time})`
            break
        case "workout":
            output = `${tags.username} acabou de malhar: ${user.afk.message} (${time})`
            break 
        case "shower":
            output = `${tags.username} acaba de se banhar: ${user.afk.message} (${time})`
            break
        case "brb":
            output = `${tags.username} voltou: ${user.afk.message} (${time})`
            break
        case "work":
            output = `${tags.username} voltou do trabalho: ${user.afk.message} (${time})`
            break
        case "read":
            output = `${tags.username} terminou de ler: ${user.afk.message} (${time})`
            break
        case "food":
            output = `${tags.username} está com a barriga cheia: ${user.afk.message} (${time})`
            break
        case "fuck":
            output = `${tags.username} terminou a sua foda: ${user.afk.message} (${time})`
            break
    }
    await client.say(channel, output)

    user.afk = undefined
    user.save()
})