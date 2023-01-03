const db = require("../services/db")
const log = require("../log")
const setAFK = async (message, msg, cmd) => {
    await db("afk").insert({
        twitch_id: msg.senderUserID,
        twitch_name: msg.senderUsername, 
        afk_type: cmd,
        afk_message: !message ? null : message,
        afk_time: Date.now().toString()
    })
    log.debug(`User entering afk state (${cmd}): ${msg.senderUsername}`)
}

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

exports.run = async (client, msg, args, cmd) => {
    // comma: afk's default ping doesn't have a comma for the default afk response (src/handlers/tmi.js:86)
    if(args.length > 200) return ", afk message too long (MAX 200)"


    const message = !args[0] ? " " + emojis[cmd] : `: ${args.join(" ")} ${emojis[cmd]}`
    setAFK(args.join(" "), msg, cmd)
    const res = {
        afk: `is now AFK${message}`,
        brb: `will be right back${message}`,
        gn: `is now sleeping${message}`,
        work: `is now working${message}`,
        study: `is getting smarter${message}`,
        workout: `is now working out${message}`,
        read: `is now reading${message}`,
        food: `is now eating${message}`,
        shower: `is now taking a shower${message}`,
        poop: `is now taking a shit${message}`,
    }
    return res[cmd]
    
}
module.exports.config = {
    name: 'afk',
    description: '',
    aliases: ['brb', 'gn', 'work', 'study', 'workout', 'read', 'food', 'shower', 'poop']
}