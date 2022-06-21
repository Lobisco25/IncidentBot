const ChannelModel = require("../../models/Channel")

exports.run = async (client, args, channel, tags, message, user) => {
   try {
    await ChannelModel.deleteOne({twitch_name: args[0]})
    await client.part(args[0])
    await client.say(channel, `Desconectado com sucesso em ${args[0]} FeelsBadMan`)
   } catch (error) {
    console.log(error)
   }
}
module.exports.config = {
    name: "leave",
    description: "command",
    aliases: [""],
    adminOnly: true,
}
