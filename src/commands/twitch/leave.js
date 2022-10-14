const ChannelModel = require("../../models/Channel")
const sevenTvEvents = require('../../handlers/7tv.js')

exports.run = async (client, args, channel, tags, message, user) => {
   
    await ChannelModel.deleteOne({twitch_name: args[0]})
    await client.part(args[0])
    await sevenTvEvents.initialize().catch(err => {
        log.error("Erro ao iniciar eventos da 7tv no canal", channel, err)
    })
    let say = {
        pt: `Desconectado com sucesso de ${args[0]} FeelsBadMan`,
        en: `Successfully disconnected from ${args[0]} FeelsBadMan`
    }
    return say
}
module.exports.config = {
    name: "leave",
    description: "command",
    aliases: [""],
    adminOnly: true,
}
