const client = require("../services/tmi")
const log = require("../log")
const prettyms = require("pretty-ms")
const db = require("../services/db")

client.on("PRIVMSG", async (msg) => {
    const user = await db("afk")
    .where({twitch_id: msg.senderUserID})
    .select("twitch_id", "afk_type", "afk_message", "afk_time")

    if(user.length === 0) return

    const time = prettyms(Date.now() - Number(user[0].afk_time)) 

    const emojis = {
        afk: "🏃 💨",
        brb: "⌛",
        gn: "💤",
        work: "💼",
        study: "📚",
        workout: "🏋🏻",
        read: "📖",
        food: "OpieOP",
        shower: "😏🚿",
        poop: "🚽"
    }

    const username = msg.senderUsername

    const message = user[0].afk_message === null 
    ? emojis[user[0].afk_type] 
    : `: ${user[0].afk_message} ${emojis[user[0].afk_type]}`

    const res = {
        afk: `${username} is no longer AFK${message} (${time})`,
        brb: `${username} is back${message} (${time})`,
        gn: `${username} woke up${message} (${time})`,
        workout: `${username} is sweating${message} (${time})`,
        work: `${username} finished their work${message} (${time})`,
        study: `${username} is now smarter${message} (${time})`,   
        read: `${username} finished their reading session${message} (${time})`,
        food: `${username} is now heavier${message} (${time})`,
        shower: `${username} is now clean${message} (${time})`,
        poop: `${username} finished pooping${message} (${time})`
    }

    log.debug(`User exiting afk state ${user[0].afk_type}: ${msg.senderUsername}`)

    client.privmsg(msg.channelName, res[user[0].afk_type])

    await db("afk").where({twitch_id: msg.senderUserID}).del()
})