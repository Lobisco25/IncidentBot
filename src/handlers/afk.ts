import client from "../services/tmi";
import log from "../log";
import prettyMilliseconds from "pretty-ms";
import db from "../services/db";
import utils from "../utils";
client.on("PRIVMSG", async (msg) => {
    const user = await db("afk").where({ twitch_id: msg.senderUserID }).select("twitch_id", "afk_type", "afk_message", "afk_time");

    if (user.length === 0) return;
    const time = prettyMilliseconds(Date.now() - Number(user[0].afk_time));
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
            emoji: "💼",
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
    const username = msg.senderUsername;
    const asd = emojis[user[0].afk_type];
    const message =
        user[0].afk_message === null
            ? ` ${await utils.getEmote(msg.channelID, asd.emotes, asd.emoji)}`
            : `: ${user[0].afk_message} ${await utils.getEmote(msg.channelID, asd.emotes, asd.emoji)}`;
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
        poop: `${username} finished pooping${message} (${time})`,
    };
    log.debug(`User exiting afk state ${user[0].afk_type}: ${msg.senderUsername}`);
    client.privmsg(msg.channelName, res[user[0].afk_type]);

    await db("afk").where({ twitch_id: msg.senderUserID }).del();
});
