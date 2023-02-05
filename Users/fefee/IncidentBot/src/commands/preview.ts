export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "provide a twitch username";
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${args[0]}.jpg?xNA `;
};
export let config = {
    name: "preview",
    description: "sends the preview of a twitch stream",
    aliases: ["prev", "thumbnail"],
    cooldown: 5000,
    permission: "viewers",
    longDescription: "displays the preview of a the given twitch stream",
    whisper: true,
    usage: "preview {twitch username}",
    namePattern: `{name}, `
};
export let cooldownUsers = [];
