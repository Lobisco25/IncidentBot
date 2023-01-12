const db = require("../services/db")
const seventv = require("../handlers/7tv")
const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    const channelstatus = await db("channels").where({twitch_name: args[1]}).select("twitch_name")
    const channel200 = channelstatus.length > 0
    const channel404 = channelstatus == 0
    const joinChannel = async () => {
        if(channel200) return "I'm already on this channel pajaDank"
        else {
            await db("channels").insert({
                twitch_name: args[1],
                custom_prefix: args[2] ?? null,
                "7tv_events": "false"
            })
            client.join(args[1])
            return "channel joined"
        }
    }
    const leaveChannel = async () => {
        if(channel404) return "channel not found in the database pajaDank"
        else {
            await db("channels").where({twitch_name: args[1]}).del()
            client.part(args[1])
            return "channel leaved"
        }
    }
    const setPrefix = async () => {
        if(channel404) return "channel not found in the database"
        if(!args[2]) return "no argument provided"
        else { 
            await db("channels").where({twitch_name: args[1]}).update({custom_prefix: args[2] ?? null})
        }
        return "channel prefix updated"
    }
    const set7TV = async () => {
        if(channel404) return "channel not found in the database"
        if(!args[2]) return "no argument provided"
        else {
            await db("channels").where({twitch_name: args[1]}).update({"7tv_events": args[2], "7tv_id": args[2] == "true" ? await utils.get7TV_id(args[1]) : null })
            seventv.init()
        }
        return "channel 7tv events updated"
    }
    const arg = args[0].toLowerCase()
    switch(arg) {
        default: return "invalid argument"
        case "join": return await joinChannel()
        case "leave": case "part": return await leaveChannel()
        case "prefix": return await setPrefix()
        case "7tv": return await set7TV()
    }
}
module.exports.config = {
    name: 'channel',
    description: '',
    aliases: [''],
    cooldown: 5000,
    devOnly: true
}