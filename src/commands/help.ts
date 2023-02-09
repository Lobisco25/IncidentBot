import db from "../services/db";
import _config from "../../config";

export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "pajaCool incidentbot's site: https://lobis.co/bot";
    const getCommandByAlias = (alias: any) => {
        var result = null;
        Object.keys(client.commands).every((c) => {
            if (client.commands[c].config.aliases.includes(alias)) {
                result = client.commands[c];
                return false;
            }
            return true;
        });
        return result;
    };

    let command = client.commands[args[0]] || getCommandByAlias(args[0]);
    if (!command) return "FeelsDankMan Command not found";

    const getPrefix = async (msg: any) => {
        const result = await db("channels").where({ twitch_name: msg.channelName }).select("custom_prefix").first();

        return result?.custom_prefix;
    };
    const prefix = (await getPrefix(msg)) || _config.prefix;

    const aliases = command.config.aliases.map((alias) => prefix + alias).join(", ");

    const permission = command.config.permission === "viewers" || null ? "" : `[${command.config.permission} only] |`;

    return `${prefix}${command.config.name} ${!command.config.aliases.length ? `(${aliases})` : ""} · ${command.config.description} | ${permission} usage: ${command.config.usage} - ${Math.floor(command.config.cooldown / 1000)}s cooldown. https://lobis.co/bot/commands/${command.config.name}`;
}
export let config = {
    name: "help",
    description: "command to check the bot's commands and their functionalities",
    aliases: ["commands", "cmds", "cmdhelp", "commandhelp"],
    cooldown: 5000,
    whisper: true,
    namePattern: "{name}, ",
    usage: "help [command]",
};
export let cooldownUsers = [];
