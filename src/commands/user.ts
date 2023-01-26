import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    const res = await utils.getUser(args[0] ?? msg.senderUsername);
    if (res.statusCode === 400) return "user not found";

    const banned = res.banned ? "!BANNED USER! |" : " ";

    const createDate = new Date(res.createdAt);

    return `${banned} ${res.displayName} - ${res.id} | color: ${res.chatColor} | created: ${await utils.formatDate(createDate)} | bio: ${
        res.bio
    } | followers: ${res.followers} | follows: ${res.follows}`;
};
export let config = {
    name: "user",
    description: "display info about a user",
    aliases: [""],
    cooldown: 5000,
    permission: "viewers",
    longDescription: "displays info about a twitch user, including the user id, the creation date, the bio, the followers and the follows. website used: https://api.ivr.fi"
};
export let cooldownUsers = [];
