import db from "../services/db";
import log from "../log";
import utils from "../utils";
const setAFK = async (message, msg, cmd) => {
    await db("afk").insert({
        twitch_id: msg.senderUserID,
        twitch_name: msg.senderUsername,
        afk_type: cmd,
        afk_message: !message ? null : message,
        afk_time: Date.now().toString(),
    });
    log.debug(`User entering afk state (${cmd}): ${msg.senderUsername}`);
};
export const run = async (client, msg, args, cmd) => {
    const emojis = {
        afk: {
            emotes: ["ppPoof", "peepoLeave", "docLeave"],
            emoji: "🏃💨",
        },
        brb: {
            emotes: ["ppSlide", "ppHop", "ppCircle"],
            emoji: "⌛",
        },
        gn: {
            emotes: ["Bedge", "GoodNight", "ResidentCD"],
            emoji: "💤",
        },
        work: {
            emotes: ["Workge", "ApuBusiness"],
            emoji: "💼 ",
        },
        study: {
            emotes: ["5Head", "NOTES", "peepoDetective", "peepoDebugger", "peepoNerd"],
            emoji: "📚",
        },
        workout: {
            emotes: ["GIGACHAD", "pajaSubs", "GachiPls"],
            emoji: "🏋🏻",
        },
        read: {
            emotes: ["READING", "PepegaReading", "BASEG"],
            emoji: "📖",
        },
        food: {
            emotes: ["peepoFat", "Tasty", "PogTasty", "CatTasty"],
            emoji: "OpieOP",
        },
        shower: {
            emotes: ["peepoShower"],
            emoji: "🚿",
        },
        poop: {
            emotes: ["peepoPooPoo"],
            emoji: "🚽",
        },
    };
    // comma: afk's default ping doesn't have a comma for the default afk response (src/handlers/tmi.js:86)
    if (args.join(" ").length > 200) return ", afk message too long (MAX 200)";

    const asd = emojis[cmd];
    const message = !args[0]
        ? ` ${await utils.getEmote(msg.channelID, asd.emotes, asd.emoji)}`
        : `: ${args.join(" ")} ${await utils.getEmote(msg.channelID, asd.emotes, asd[emojis])}`;
    setAFK(args.join(" "), msg, cmd);
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
    };
    return res[cmd];
};
export let config = {
    name: "afk",
    description: "let people know you are going afk",
    aliases: ["brb", "gn", "work", "study", "workout", "read", "food", "shower", "poop"],
    permission: "viewers",
    longDescription: "sets you as afk ('away from keyboard'). several aliases exist for different occasions, you can check them in this page",
    cooldown: 5000,
};
export let cooldownUsers = [];