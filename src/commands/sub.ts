import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    const user = args[1] ?? msg.senderUsername;
    const channel = args[0] ?? msg.channelName;

    const res = await utils.http.get(`https://api.ivr.fi/v2/twitch/subage/${user}/${channel}`);

    if (res.statusCode === 400) return "channel or user not found";

    if (res.channel.statusHidden) return `the user ${user} has hidden their status`;

    if (!res.cumulative) return `the user ${user} has never been subscribed to this channel`;

    if (!res.meta && res.cumulative)
        return `the user ${user} is not currently subscribed to this channel, but used to be subscribed for ${res.cumulative.months} months`;

    const subEnd = res.meta.endsAt
        ? "sub ends in " + utils.formatMS(new Date(res.cumulative.end).valueOf() - Date.now().valueOf())
        : "Permanent sub";

    const gifter = res?.meta?.giftMeta ? `| gifter: ${res.meta.giftMeta.gifter.displayName}` : " ";

    return `${user} - ${channel} | subscribed for ${res.cumulative.months} months | ${subEnd} | type: tier ${res.meta.tier} ${res.meta.type} ${gifter}`;
};
export let config = {
    name: "sub",
    description: "displays the sub information of a user",
    aliases: ["subage", "sa"],
    cooldown: 5000,
    permission: "viewers",
    longDescription: "displays the subscription information of an user in a channel, including the sub end date, the sub type and the gifter. website used: https://api.ivr.fi/"
};
export let cooldownUsers = [];
