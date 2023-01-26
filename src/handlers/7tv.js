const client = require("../services/tmi")
const EventSource = require("eventsource")
const ChannelModel = require("../models/Channel")
const baseUrl = `https://events.7tv.app/v1/channel-emotes?channel=${
    process.env.MAIN_CHANNEL || "bytter_"
}`

var source = null

const createEventSource = async () => {
    var channels = await ChannelModel.find({SevenTV_Events: {$eq: true}})
        const url = `${baseUrl}&channel=${channels
            .map((c) => c.twitch_name)
            .join("&channel=")}`
            source = new EventSource(url)
}

const handleEvent = (e) => {
    const data = JSON.parse(e.data)
    switch (data.action) {
        case "ADD":
            client.privmsg(
                data.channel,
                `${data.actor} adicionou ${data.name} na 7TV`
            )
            break
        case "REMOVE":
            client.privmsg(
                data.channel,
                `${data.actor} removeu ${data.name} na 7TV`
            )
            break
        case "UPDATE":
            client.privmsg(
                data.channel,
                `${data.actor} mudou o nome de ${data.emote.name} para ${data.name} na 7TV`
            )
            break
    }
}

const addListener = () => {
    source.addEventListener("update", handleEvent, false)
}

const initialize = async () => {
    source?.close()
    source = null
    await createEventSource().then(() => {
        addListener()
    })
}

module.exports = {
    initialize,
}
