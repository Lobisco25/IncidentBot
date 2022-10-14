const ChannelModel = require("../../models/Channel")

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) return
    const channelTarget = args[0].toLowerCase()

    await ChannelModel.findOneAndUpdate(
        { twitch_name: channelTarget },
        { customPrefix: args[1] }
    )

    
    let say = {    
     pt: `FeelsOkayMan 👍 Prefixo de ${channelTarget} mudado para ${args[1]}`,
     en: `FeelsOkayMan 👍 ${channelTarget}'s prefix set to ${args[1]}`

    }
    return say
}
module.exports.config = {
    name: "channelprefix",
    description: "Muda o prefixo do canal especificado",
    aliases: [""],
    adminOnly: true,
}
