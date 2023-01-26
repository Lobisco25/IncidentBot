import db from "../services/db";
import { init as seventv } from "../handlers/7tv";
import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    const channelDB = await db("channels").where({ twitch_name: args[1] }).select("*");
    const joinChannel = async () => {
        if (channelDB.length) return "I'm already on this channel pajaDank";
        await db("channels").insert({
            twitch_name: args[1],
            custom_prefix: args[2],
            "seventv_events": "false",
        });

        client.join(args[1]);
        return "channel joined";
    };
    const leaveChannel = async () => {
        if (!channelDB) return "channel not found in the database pajaDank";

        await db("channels").where({ twitch_name: args[1] }).del();
        client.part(args[1]);
        return "channel leaved";
    };
    const setPrefix = async () => {
        if (!channelDB) return "channel not found in the database";
        if (!args[2]) return "no argument provided";

        await db("channels").where({ twitch_name: args[1] }).update({ custom_prefix: args[2] });

        return "channel prefix updated";
    };
    const set7TV = async () => {
        if (!channelDB) return "channel not found in the database";
        const seventvId = await utils.get7TV_id(args[1]);

        if (!seventvId) return "channel not found on 7tv";

        const seventvEvents = channelDB[0].seventv_events ^ 1;

        await db("channels")
            .where({ twitch_name: args[1] })
            .update({ seventv_events: seventvEvents, seventv_id: seventvId });
        seventv();
        return `channel 7tv events updated to ${seventvEvents === 1 ? "enabled" : "disabled"}`;
    };
    switch (args[0].toLowerCase()) {
        case "join":
            return await joinChannel();
        case "leave":
        case "part":
            return await leaveChannel();
        case "prefix":
            return await setPrefix();
        case "7tv":
            return await set7TV();
        default:
            return "invalid argument";
    }
};
export let config = {
    name: "channel",
    description: "changes settings of channels",
    aliases: [""],
    cooldown: 5000,
    permission: "dev",
    longDescription: "dev-only command for changing settings of channels, like adding/removing channels, setting custom prefixes, enabling/disabling 7tv events and others",
};
export let cooldownUsers = [];
