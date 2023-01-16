const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    const user = !args[0] || !args[1] ? msg.senderUsername : args[0]
    const channel = !args[0] ? msg.channelName : !args[1] ? args[0] : args[1]
    const res = await utils.http.get(`https://api.ivr.fi/v2/twitch/subage/${user}/${channel}`)

    if (res.statusCode === 400) return "channel or user not found"

    if (res.channel.statusHidden) return `the user ${user} has hidden their status`

    if(!res.cumulative) return `${user} - ${channel} | they were never subscribed to this channel`

    if(res.streak === null) return `${user} - ${channel} | they were subscribed for ${res.cumulative.months} months | sub ended in: ${res.cumulative.end}`

    else return `${user} - ${channel} | subscribed for ${res.cumulative.months} months | sub ends in: ${utils.formatMS(new Date(res.cumulative.end) - Date.now())} | type: tier ${res.meta.tier} ${res.meta.type} ${res.meta.giftMeta ? `| gifter: ${res.meta.giftMeta.gifter.displayName}` : '' }`
}
module.exports.config = {
    name: 'sub',
    description: '',
    aliases: ['subage', 'sa'],
    cooldown: 5000
}