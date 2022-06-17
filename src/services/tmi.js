const tmi = require("tmi.js")
const ChannelModel = require("../models/Channel")
const mainChannel = process.env.MAIN_CHANNEL || "bytter_"
const log = require("../handlers/logger")

const client = new tmi.Client({
    options: { debug: Boolean(process.env.TMI_DEBUG) },
    identity: {
        username: "IncidentBot",
        password: process.env.TMI_TOKEN,
    },
    channels: [mainChannel],
})

const joinChannels = async () => {
    const result = await ChannelModel.find({})
    result
        .map((c) => c.twitch_name)
        .forEach(async (channel) => {
            await client
                .join(channel)
                .catch((err) => log.error(`Erro ao entrar no canal ${channel} ${err}`))
        })
    log.info(`Bot escutando em ${result.length} canais.`)
}

client
    .connect()
    .catch((err) => {
        log.error("Não foi possível criar client do tmi")
    })
    .then(() => {
        joinChannels()
    })

client.on("connected", (adress, port) => {
    client.ping().then(function (data) {
        let ping = Math.floor(Math.round(data * 1000))
        client.say(mainChannel, `TrollDespair fui reinciado (${ping}ms)`)
        log.info(`Bot conectado ao tmi ${ping}ms`)
    })
})

module.exports = client
