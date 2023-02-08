import { readdir } from "node:fs";
import config from "../../config";
import client from "../services/tmi";
import db from "../services/db";
import log from "../log";
import twitch from "../services/twitch";

client.commands = {};

// get files
readdir("../incidentbot/src/commands", (err, files) => {
    if (err) return log.error(`Couldn't read command folder (${err})`);

    const jsfile = files.filter((f) => f.split(".").pop() == "ts");
    jsfile.forEach(async (f) => {
        let pull = await import(`./../commands/${f}`);
        client.commands[pull.config.name] = pull;
        const r = await db("commands").where({ name: pull.config.name });
        if (r.length !== 0) return;
        else await db("commands").insert({ name: pull.config.name, uses: 1 });
    });
});
// functions

interface ICommand {
    run: (client, msg, args, cmd) => Promise<string>;
    config: {
        name: string;
        description?: string;
        aliases?: string[];
        permission: "viewers" | "mods" | "owners" | "dev";
        longDescription?: string;
        cooldown: number;
    };
    cooldownUsers: string[];
}

function setUserCooldown(c: ICommand, msg: any) {
    const userId = msg.senderUsername == config.dev ? "12345" : msg.senderUserID;
    client.commands[c.config.name].cooldownUsers.push(userId);

    setTimeout(() => {
        client.commands[c.config.name].cooldownUsers = client.commands[
            c.config.name
        ].cooldownUsers.filter((i) => i !== msg.senderUserID)
    }, c.config.cooldown);
}

function getCommandByAlias(alias) {
    var result = null;
    Object.keys(client.commands).every((c) => {
        if (client.commands[c].config.aliases.includes(alias)) {
            result = client.commands[c];
            return false;
        }
        return true;
    });
    return result;
}

// main function
client.on("WHISPER", async (msg: any) => {
    // essential variables
    msg.isDev = msg.senderUsername === config.dev;
    msg.platform = "whispers";

    const dev = config.devEnv ? "[DEV]" : "";

    // variables
    const prefix = config.prefix;
    let args = msg.messageText.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command = client.commands[cmd] || getCommandByAlias(cmd);
    // essential ifs
    if (!command || !msg.messageText.startsWith(prefix)) return;
    if (command.cooldownUsers.includes(msg.senderUserID)) return;
    if(!command.config.whisper) return twitch.whisper(msg.senderUserID, dev + " This command is not available in whispers");
    let permission = command.config.permission;
    if (permission === "dev" && !msg.isDev) return;

    // message sending handler
    try {
        let chatRes = await command.run(client, msg, args, cmd);
        // name format handling
        twitch.whisper(msg.senderUserID, `${dev} ${chatRes === undefined ? "command executed" : chatRes}`);
        await db("commands").where("name", command.config.name).increment("uses", 1);
    } catch (err) {
        log.error(`Could not run the command ${command.config.name}: ${err}`);
    }
    setUserCooldown(command, msg)
});