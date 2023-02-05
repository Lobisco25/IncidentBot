import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "You tucked yourself in bed alone " + (await utils.getEmote(msg.channelID, ["Sadge", "Sadeg", "TrollDespair"], "pajaDespair"));
    if (args[0].toLowerCase() === "incidentbot") return "stop, i need to stay awake pajaDent";
    if (!args[1]) return `you tucked ${args[0]} in bed FeelsOkayMan 👉 ${await utils.getEmote(msg.channelID, ["Bedge"], "🛏")}`;
    return `you tucked ${args[0]} in bed ${args[1]} 👉 ${await utils.getEmote(msg.channelID, ["Bedge"], "🛏")}`;
};
export let config = {
    name: "tuck",
    description: "tuck someone in bed",
    aliases: [""],
    cooldown: 5000,
    permission: "viewers",
    whisper: false,
    usage: "tuck [user] [emote]",
    namePattern: `{name}, `
};
export let cooldownUsers = [];
