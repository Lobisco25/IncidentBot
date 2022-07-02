const ChannelModel = require("../../models/Channel")

exports.run = async (client, args, channel, tags, message, user) => {
    if(!args[0]) return
    const channelTarget = channel.toLowerCase()
    await ChannelModel.findOneAndUpdate( 
        { twitch_name: channelTarget },
        { customPrefix: args[0] },
        )
    client.say(
        channel,
        `${tags.username}, o prefixo desse canal foi mudado para ${args[0]} pajaL 👍 `
    )

    }

module.exports.config = {
    name: "prefix",
    description: "Muda o prefixo do canal (streamer)",
    aliases: [""],
    permission: {
        adminOnly: true,
        streamerOnly: true
    }
}
