const ChannelModel = require("../../models/Channel")
const sevenTvEvents = require('../../handlers/7tv.js')


exports.run = async (client, args, channel, tags, message, user) => {
    switch (args[0]) {
        default:
            client.say(channel, `${tags.username}, Para desativar os alertas de emotes, use os argumentos on e off pajaM`)
            break
        case "off":
            await ChannelModel.findOneAndUpdate({ twitch_name: channel }, { SevenTV_Events: false })
            await sevenTvEvents.initialize().catch(err => {
                log.error("Erro ao iniciar eventos da 7tv no canal", channel, err)
            })
            await client.say(
                channel,
                `${tags.username}, agora eu irei parar de avisar sobre mudanças nos emotes FeelsOkayMan`
            )

            break
        case "on":
            await ChannelModel.findOneAndUpdate({ twitch_name: channel }, { SevenTV_Events: true })
            await sevenTvEvents.initialize().catch(err => {
                log.error("Erro ao iniciar eventos da 7tv no canal", channel, err)
            })
            await client.say(
                channel,
                `${tags.username}, agora eu irei voltar a avisar sobre mudanças nos emotes FeelsOkayMan`
            )
            break
    }
}
module.exports.config = {
    name: "emotes",
    description: "ativa ou desativa os alertas de emote da 7tv",
    aliases: ["7tv", "7tvemotes"],
    streamerOnly: true
}
