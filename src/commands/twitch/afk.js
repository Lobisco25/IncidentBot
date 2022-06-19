const UserModel = require("../../models/User")
async function setAFKStatus(message, tags) {
    await UserModel.findOneAndUpdate(
        { twitch_id: tags["user-id"] },
        { isafk: true, afkmessage: message },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}
exports.run = async (client, args, channel, tags, message, user) => {
    const alias = this.config.aliases
    const a = args[0] === undefined ? "(Sem mensagem)" : `${args.join(" ")}`
    if(alias.includes("afk") === true) {
        await setAFKStatus("(sem mensagem)", tags)
        await client.say(
            channel,
            `${tags.username} agora está AFK: ${a}`
        )
    } else if(alias.includes("gn") === true) {
        await setAFKStatus(args.join(" "), tags)
        await client.say(channel, `${tags.username} foi dormir: ${a}`)
    } else if(alias.includes("code") === true) {
        await setAFKStatus(args.join(" "), tags)
        await client.say(channel, `${tags.username} foi programar: ${a}`)
    }
}
module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: ["afk ","gn", "code"],
    cooldown: 10000
}