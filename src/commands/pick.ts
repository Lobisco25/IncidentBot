export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "no arguments provided";
    const random = Math.floor(Math.random() * args.length);
    return args[random];
};
export let config = {
    name: "pick",
    description: "selects one of the given arguments",
    aliases: ["select", "choose", "choice"],
    cooldown: 5000,
    permission: "viewers",
    whisper: true,
    namePattern: "{name}, ",
    usage: "pick [arguments]",
};
export let cooldownUsers = [];