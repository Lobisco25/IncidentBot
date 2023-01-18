const db = require("../services/db")
const client = require("../services/tmi")
const WebSocket = require("ws")
const log = require("../log")
let ws = null
const subscribeChannels = async () => {
    ws = new WebSocket("wss://events.7tv.io/v3")
    ws.on("open", async () => {
        const ids = await db("channels").where({ seventv_events: 1 }).select("seventv_id")
        const subscribe = []
        ids.forEach(async (id) => {
            subscribe.push({
                "op": 35,
                "d": {
                    "type": "emote_set.update",
                    "condition": { "object_id": id["7tv_id"] }
                }
            })
        })
        subscribe.forEach(async (sub) => {
            ws.send(JSON.stringify(sub))
        })
        log.info("7TV WebSocket connected in " + ids.length + " channels")
    })
}
const handleMessages = async (event) => {
    const r = JSON.parse(event.data)
    if (r.op !== 0) return
    const channelDB = await db("channels").where({ seventv_id: r.d.body.id }).select("twitch_name")
    const channel = channelDB[0].twitch_name
    const editor = r.d.body.actor.username === channel ? "owner" : r.d.body.actor.display_name
    let text = null
    if (r.d.body.pushed) {
        const emote = r.d.body.pushed[0].value.name
        text = `${emote} added on ${channel} by ${editor}`
    }
    if (r.d.body.updated) {
        const emote = r.d.body.updated[0].old_value.name
        const alias = r.d.body.updated[0].value.name
        text = `${emote} renamed to ${alias} on ${channel} by ${editor}`
    }
    if (r.d.body.pulled) {
        const emote = r.d.body.pulled[0].old_value.name
        text = `${emote} removed on ${channel} by ${editor}`
    }
    await client.privmsg(await channel, `(7TV) -> ${text}`)
}

const addListener = async () => { 
    ws.addEventListener("message", async (event) => handleMessages(event))
}
const majorInit = async () => {
    await subscribeChannels()
    await addListener()
}
const init = async () => {
    ws.close()
    await majorInit()
}
module.exports = { majorInit, init }