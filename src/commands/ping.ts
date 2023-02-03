import utils from "../utils";
import twitch from "../services/twitch";
export const run = async (client, msg, args, cmd) => {
    return `pajaDink ping: ${await utils.ping()} | usage: ${utils.usage} | uptime: ${utils.uptime} | os uptime: ${utils.osUptime}`;
};
export let config = {
    name: "ping",
    description: "pings the user with some technical info",
    aliases: ["pong"],
    permission: "viewers",
    longDescription: "pings the bot, checking if it's online and displaying some technical info, like the ping, the uptime, the os uptime and the usage",
    cooldown: 5000,
    whisper: true
};
export let cooldownUsers = [];
