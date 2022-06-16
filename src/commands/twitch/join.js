const ChannelModel = require("../../models/Channel")

exports.run = async (client, args, channel, tags, message) => {
    if (!args[0]) return
    const channelTarget = args[0].toLowerCase()

    // Gera um erro se o canal não existir
    await client.join(channelTarget).catch((err) => {
        console.log(err)
    })

    await ChannelModel.create({
        twitch_name: channelTarget,
        customPrefix : args[1] // Caso args[1] seja undefined, ele não insere no banco de dados
    }).catch(err => { log.error("Erro ao criar um canal ", err) })

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
