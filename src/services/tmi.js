const tmi = require("tmi.js")
const ChannelModel = require("../models/Channel")
const mainChannel = process.env.MAIN_CHANNEL || "bytter_"

const client = new tmi.Client({
    options: { debug: false },
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
        .forEach((channel) => {
            client
                .join(channel)
                .catch(() => console.error(`O canal ${channel} não existe!`))
            console.log("Entrei no canal #", channel)
        })
}

client
    .connect()
    .catch((err) => console.log(err))
    .then(() => {
        joinChannels()
    })

client.on("connected", (adress, port) => {
    client.ping().then(function (data) {
        let ping = Math.floor(Math.round(data * 1000))
        client.say(mainChannel, `TrollDespair fui reinciado (${ping}ms)`)
    })
})

module.exports = client
