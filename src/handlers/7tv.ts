import db from "../services/db"
import client from "../services/tmi"
import WebSocket from "ws"
import log from "../log"
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
                    "condition": { "object_id": id["seventv_id"] }
                }
            })
        })
        subscribe.forEach(async (sub) => {
            ws.send(JSON.stringify(sub))
        })
        log.info("7TV WebSocket connected in " + ids.length + " channels")
    })
}
const handleMessages = async (event: { data: string }) => {
    const r = JSON.parse(event.data)
    if (r.op !== 0) return
    const channelDB = await db("channels").where({ seventv_id: r.d.body.id }).select("twitch_name")
    const channel = channelDB[0].twitch_name
    const editor = r.d.body.actor.username === channel ? "owner" : r.d.body.actor.display_name
    let text = null
    if (r.d.body.pushed) {
        const emote = r.d.body.pushed[0].value.name
        text = `emote ${emote} added by ${editor}`
    }
    if (r.d.body.updated) {
        const emote = r.d.body.updated[0].old_value.name
        const alias = r.d.body.updated[0].value.name
        text = `emote ${emote} renamed to ${alias} by ${editor}`
    }
    if (r.d.body.pulled) {
        const emote = r.d.body.pulled[0].old_value.name
        text = `emote ${emote} removed by ${editor}`
    }
    await client.privmsg(await channel, `(7TV) -> ${text}`)
}

const addListener = async () => { 
    ws.addEventListener("message", async (event: any) => handleMessages(event))
}
const majorInit = async () => {
    await subscribeChannels()
    await addListener()
}
const init = async () => {
    ws.close()
    await majorInit()
}
export { majorInit, init }