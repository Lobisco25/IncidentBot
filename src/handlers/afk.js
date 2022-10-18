const client = require("../services/tmi")
const UserModel = require("../models/User")
const ChannelModel = require("../models/Channel")
const prettyMilliseconds = require("pretty-ms")

client.on("PRIVMSG", async (msg) => {
    const channelDB = await ChannelModel.findOne({ twitch_name: msg.channelName })
    const user = await UserModel.findOne({ twitch_id: msg.senderUserID.toString() })
    if (!user) return
    if (!user.afk?.time) return
    
    const time = prettyMilliseconds(Date.now() - user.afk.time)
    let output = null

    const username = msg.senderUsername
    const message = user.afk.message

    const afkType = (type) => {
        const source = {
            brb: {
                pt: `${username} voltou: ${message} (${time})`,
                en: `${username} is back: ${message} {${time}}`
            },
            gn: {
                pt: `${username} acordou: ${message} (${time})`,
                en: `${username} woke up: ${message} (${time})`
            },
            afk: {
                pt: `${username} voltou de seu AFK: ${message} (${time})`,
                en: `${username} is no longer AFK: ${message} (${time})`
            },
            workout: {
                pt: `${username} acabou de malhar: ${message} (${time})`,
                en: `${username} roberto just finished working out: ${message} (${time})`
            },
            work: {
                pt: `${username} voltou do trabalho: ${message} (${time})`,
                en: `${username} finished their work: ${message} (${time})`
            },
            study: {
                pt: `${username} terminou de estudar: ${message} (${time})`,
                en: `${username} finished studying: ${message} (${time})`
            },
            read: {
                pt: `${username} terminou de ler: ${message} (${time})`,
                en: `${username} finished their reading session: ${message} (${time})`
            },
            food: {
                pt: `${username} está com a barriga cheia: ${message} (${time})`,
                en: `${username} is done eating: ${message} (${time})`
            },
            fuck: {
                pt: `${username} terminou a sua foda: ${message} (${time})`,
                en: `${username} finished their fucking session: ${message} (${time})`
            },
            shower: {
                pt: `${username} acaba de se banhar: ${message} (${time})`,
                en: `${message} finished showering: ${message} (${time})`
            },
        }
        output = source[type]
        return output
    }
    let say = null
    const response = afkType(user.afk._type)
    afkType(user.afk._type)
    switch (channelDB.lang) {
        default: 
            say = response.en 
            break
        case ("pt"):
            say = response.pt
            break
    }
    await client.privmsg(msg.channelName, say)

    user.afk = undefined
    user.save()
})