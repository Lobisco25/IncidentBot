import utils from "../utils";
import db from "../services/db";
export const run = async (client, msg, args, cmd) => {
    const channelDB = await db("channels").where({ twitch_name: msg.channelName }).first();
    return `pajaDink ping: ${await utils.ping()} | usage: ${utils.usage} | uptime: ${utils.uptime} | os uptime: ${utils.osUptime} | prefix: ${channelDB.custom_prefix ?? "-"}`;
};
export let config = {
    name: "ping",
    description: "pings the user with some technical info",
    aliases: ["pong"],
    permission: "viewers",
    longDescription: "pings the bot, checking if it's online and displaying some technical info, like the ping, the uptime, the os uptime and the usage",
    cooldown: 5000,
    whisper: true,
    namePattern: "{name}, ",
    usage: "ping",
};
export let cooldownUsers = [];
