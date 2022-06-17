const UserModel = require("../../models/User")
async function setAFKStatus(message, tags) {
    await UserModel.findOneAndUpdate(
        { twitch_id: tags["user-id"] },
        { isafk: true, afkmessage: message },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}
exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) {
        await setAFKStatus("(sem mensagem)", tags)
        await client.say(
            channel,
            `${tags.username} agora está AFK: (sem mensagem)`
        )
    }
    else {
        await setAFKStatus(args.join(" "), tags)
        await client.say(
            channel,
            `${tags.username} agora está AFK: ${args.join(" ")}`
        )
    }
}
module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: [""],
    cooldown: 10000
}
