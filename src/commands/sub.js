const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    const user = args[0] ?? msg.senderUsername
    const channel = args[1] ?? msg.channelName

    const res = await utils.http.get(`https://api.ivr.fi/v2/twitch/subage/${user}/${channel}`)

    if (res.statusCode === 400) return "channel or user not found"

    if (res.channel.statusHidden) return `the user ${user} has hidden their status`

    const metadata = [
        res.cumulative
            ? `subscribed for ${res.cumulative.months} months`
            : "they were never subscribed to this channel",
        res.cumulative.endsAt
        ? `sub ends in: ${utils.formatMS(new Date(res.cumulative.end) - Date.now())}`
        : "Permanent sub",
        res?.meta
        && `type: tier ${res.meta.tier} ${res.meta.type}`,
        res?.meta?.giftMeta && `gifter: ${res.meta.giftMeta.gifter.displayName}`
    ].filter(Boolean).join(" | ")

    return `${user} - ${channel} | ${metadata}`
}
module.exports.config = {
    name: 'sub',
    description: '',
    aliases: ['subage', 'sa'],
    cooldown: 5000
}