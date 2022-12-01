const { ChatClient } = require("@kararty/dank-twitch-irc")
const ChannelModel = require("../models/Channel")
const mainChannel = process.env.MAIN_CHANNEL || "bytter_"
const log = require("../handlers/logger")

const client = new ChatClient({
    username: "Incidentbot",
    password: process.env.TMI_TOKEN
})





const joinChannels = async () => {
    const channelDB = await ChannelModel.find({})
    let channels = []
    channelDB
        .map((c) => c.twitch_name)
        .forEach(async (channel) => {
            channels.push(channel)
        })
    client.joinAll(channels).catch((err) => log.critical("Não foi possível entrar nos canais | " + err))
    log.info(`Bot entrou em ${channelDB.length} canais.`)
}

client
    .connect()
    .catch((err) => {
        log.critical("Não foi possível criar client do tmi | " + err)
    })
    .then(() => {
        joinChannels()
    })

    client.on(`NOTICE`, async error => console.log(error))

client.on("ready", async () => {
    const asd = Date.now();
    await client.ping();
    let ping = Date.now() - asd
    client.privmsg(mainChannel, `pajaDespair fui reinciado (${ping}ms)`)
    log.info(`Bot conectado ao tmi | ${ping}ms`)
})


module.exports = client
