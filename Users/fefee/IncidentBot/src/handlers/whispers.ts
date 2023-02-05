import { readdir } from "node:fs";
import config from "../../config";
import client from "../services/tmi";
import db from "../services/db";
import log from "../log";
import twitch from "../services/twitch";

let commands = {};

// get files
readdir("../incidentbot/src/commands", (err, files) => {
    if (err) return log.error(`Couldn't read command folder (${err})`);

    const jsfile = files.filter((f) => f.split(".").pop() == "ts");
    jsfile.forEach(async (f) => {
        let pull = await import(`./../commands/${f}`);
        commands[pull.config.name] = pull;
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
        whispers: boolean;
        namePattern: string;
    };
    cooldownUsers: string[];
}

function setUserCooldown(c: ICommand, msg: any) {
    const userId = msg.senderUsername == config.dev ? "12345" : msg.senderUserID;
    commands[c.config.name].cooldownUsers.push(userId);

    setTimeout(() => {
        commands[c.config.name].cooldownUsers = commands[c.config.name].cooldownUsers.filter((i) => i !== msg.senderUserID);
    }, c.config.cooldown);
}

function getCommandByAlias(alias) {
    var result = null;
    Object.keys(commands).every((c) => {
        if (commands[c].config.aliases.includes(alias)) {
            result = commands[c];
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

    // variables
    const prefix = config.prefix;
    let args = msg.messageText.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command = commands[cmd] || getCommandByAlias(cmd);
    // essential ifs
    if (!command || !msg.messageText.startsWith(prefix)) return;
    if (command.cooldownUsers.includes(msg.senderUserID)) return;
    if (!command.config.whisper) return twitch.whisper(msg.senderUserID, "This command is not available in whispers");
    let permission = command.config.permission;
    if (permission === "dev" && !msg.isDev) return;

    // message sending handler
    try {
        const commandsDB = await db("commands").where("name", command.config.name);

        if (commandsDB[0].disabled === 1) return client.privmsg(msg.channelName, `this command has been temporarily disabled`);
        let chatRes = await command.run(client, msg, args, cmd);
        // name format handling
        twitch.whisper(msg.senderUserID, `${chatRes === undefined ? "command executed" : chatRes}`);
        await db("commands").where("name", command.config.name).increment("uses", 1);
    } catch (err) {
        log.error(`Could not run the command ${command.config.name}: ${err}`);
    }
    setUserCooldown(command, msg);
});

export default commands;
