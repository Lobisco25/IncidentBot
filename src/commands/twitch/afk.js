const UserModel = require("../../models/User")
async function setAFKStatus(message, tags, type) {
    const query = {
        afk: {
            message: message,
            time: new Date(),
            _type: type,
        },
    }

    await UserModel.findOneAndUpdate({ twitch_id: tags["user-id"] }, query, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
    })
}

exports.run = async (client, args, channel, tags, message, user) => {
    const msg = args[0] === undefined ? "(Sem mensagem)" : `${args.join(" ")}`
    await setAFKStatus(msg, tags, tags.source)
    var output = null
    const afkType = (type) => {
        const source = {
            afk: `${tags.username} agora está AFK: ${msg}`,
            brb: `${tags.username} volta já: ${msg}`,
            gn: `${tags.username} foi dormir: ${msg}`,
            code: `${tags.username} foi programar: ${msg}`,
            work: `${tags.username} foi trabalhar: ${msg}`,
            study: `${tags.username} foi estudar: ${msg}`,
            workout: `${tags.username} foi malhar: ${msg}`,
            read: `${tags.username} foi ler: ${msg}`,
            food: `${tags.username} foi comer: ${msg}`,
            fuck: `${tags.username} foi foder: ${msg}`,
            shower: `${tags.username} foi tomar banho: ${msg}`,
        }
        output = source[type]
        return output
    }

    afkType(tags.source)
    await client.say(channel, output)
}

module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: ["gn","study","code","workout","shower","brb","work","read","food","fuck"],
    cooldown: 2000,
}