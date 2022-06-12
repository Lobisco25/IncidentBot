const ChannelModel = require("../../models/Channel")

exports.run = async (client, args, channel, tags, message) => {
    if (!["bytter_", "lobisco25", "feridinha"].includes(tags.username)) return
    if (!args[0]) return
    const channelTarget = args[0].toLowerCase()

    // Gera um erro se o canal não existir
    await client.join(channelTarget).catch((err) => {
        console.log(err)
    })

    await ChannelModel.create({
        twitch_name: channelTarget,
    })

    await client.say(
        channel,
        `Conectado com sucesso em ${args[0]} FeelsOkayMan`
    )
}

module.exports.config = {
    name: "join",
    description: "Join channels",
    cooldown: 5000,
    aliases: [],
}
