const ChannelModel = require("../../models/Channel")
const log = require("../../handlers/logger")
const sevenTvEvents = require('../../handlers/7tv.js')

exports.run = async (client, args, channel, tags, message) => {
    if (!args[0]) return
    const channelTarget = args[0].toLowerCase()

    // Gera um erro se o canal não existir
    await client.join(channelTarget).catch((err) => {
        log.error("Erro ao entrar no canal", channelTarget, err)
        return
    })

    await ChannelModel.create({
        twitch_name: channelTarget,
        customPrefix: args[1], // Caso args[1] seja undefined, ele não insere no banco de dados
    }).catch((err) => {
        log.error("Erro ao criar um canal ", err)
        return
    })

    await sevenTvEvents.initialize().catch(err => {
        log.error("Erro ao iniciar eventos da 7tv no canal", channel, err)
    })

    await client.say(
        channel,
        `Conectado com sucesso em ${args[0]} FeelsOkayMan`
    )
}

module.exports.config = {
    name: "join",
    description: "Entra no canal especificado.",
    cooldown: 5000,
    aliases: [],
    adminOnly: true,
}
