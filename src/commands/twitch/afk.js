const UserModel = require("../../models/User")
async function setAFKStatus(message, tags, type) {
    const query = {
        afk: {
            message: message,
            time: new Date(),
            _type: type
        }
    }

    await UserModel.findOneAndUpdate(
        { twitch_id: tags["user-id"] },
        query,
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}
exports.run = async (client, args, channel, tags, message, user) => {
    const msg = args[0] === undefined ? "(Sem mensagem)" : `${args.join(" ")}`
    await setAFKStatus(msg, tags, tags.source)
    var output = null
    switch (tags.source) {
        case "afk":
            output = `${tags.username} agora está AFK: ${msg}`
            break
        case "study":
            output = `${tags.username} foi estudar: ${msg}`
            break
        case "code":
            output = `${tags.username} foi programar: ${msg}`
            break
        case "gn":
            output = `${tags.username} foi dormir: ${msg}`
            break
        case "workout":
            output = `${tags.username} foi malhar: ${msg}`
            break
        case "shower": 
            output = `${tags.username} foi tomar banho: ${msg}`
            break
        case "brb":
            output = `${tags.username} volta já: ${msg}`
            break
        case "work":
            output = `${tags.username} foi trabalhar: ${msg}`
            break
        case "read":
            output = `${tags.username} foi ler: ${msg}`
            break
        case "food": 
            output = `${tags.username} foi comer: ${msg}`
            break
        case "fuck":
            output = `${tags.username} foi foder: ${msg}`
            break
    }
    await client.say(channel, output)
}

module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: ["gn", "study", "code", "workout"],
    cooldown: 2000
}