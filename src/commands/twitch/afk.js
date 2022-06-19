const UserModel = require("../../models/User")
async function setAFKStatus(message, tags) {
    await UserModel.findOneAndUpdate(
        { twitch_id: tags["user-id"] },
        { isafk: true, afkmessage: message, afktime: new Date()},
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}
exports.run = async (client, args, channel, tags, message, user) => {
    // const alias = this.config.aliases
    const msg = args[0] === undefined ? "(Sem mensagem)" : `${args.join(" ")}`
    // console.log(alias[0], alias[1], alias[2])
    if("afk") {
        await setAFKStatus(`${msg}`, tags)
        await client.say(
            channel,
            `${tags.username} agora está AFK: ${msg}`
        )
    } else if("gn") {
        await setAFKStatus(`${msg}`, tags)
        await client.say(channel, `${tags.username} foi dormir: ${msg}`)

    } else if("code") {
        await setAFKStatus(`${msg}`, tags)
        await client.say(channel, `${tags.username} foi programar: ${msg}`)
    }
}

module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: ["afk", "gn", "code"],
    cooldown: 10000
}
