import { readdir } from "node:fs"
import config from "../../config"
import client from "../services/tmi"
import db from "../services/db"
import log from "../log"

let commands = {}

// get files
readdir("../incidentbot/src/commands", (err, files) => {
    if (err) return log.error(`Couldn't read command folder (${err})`)

    const jsfile = files.filter((f) => f.split(".").pop() == "ts")
    jsfile.forEach(async (f) => {
        let pull = await import(`./../commands/${f}`)
        console.log(pull)
        commands[pull.config.name] = pull
        const r = await db("commands").where({name: pull.config.name})
        if (r.length !== 0) return
        else await db("commands").insert({name: pull.config.name, uses: 1} ) 
    })
})
// functions
async function getPrefix(msg) {
    const result = await db("channels").where({ twitch_name: msg.channelName }).select("custom_prefix")
        .catch((err) => {
            log.error(`Could not get custom channel prefix: ${err}`)
        })
    return result[0]?.custom_prefix
}

function getCommandByAlias(alias) {
    var result = null
    Object.keys(commands).every((c) => {
        if (commands[c].config.aliases.includes(alias)) {
            result = commands[c]
            return false
        }
        return true
    })
    return result
}

// main function
client.on("PRIVMSG", async (msg: any) => {
    //msg extra variables
    msg.isBroadcaster = msg.badgesRaw.startsWith("broadcaster/")
    msg.isVip = !!msg.ircTags?.vip
    msg.isSelf = msg.senderUserID === config.botID

    if (msg.isSelf) return

    // variables
    const prefix = (await getPrefix(msg) || config.prefix)
    let args = msg.messageText.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    let command = commands[cmd] || getCommandByAlias(cmd)

    // essential ifs
    if (!command || !msg.messageText.startsWith(prefix)) return
    if (command.cooldownUsers.includes(msg.senderUserID)) return
    if (command.config.devOnly && msg.senderUsername != config.dev) return
    if (command.config.streamerOnly && !msg.isBroadcaster) return

    // message sending handler 
    try {
        let chatRes = await command.run(client, msg, args, cmd)
        // name format handling

        let nome = ""
        switch (command.config.name) {
            default: nome = msg.displayName + ","; break
            case ("eval"): nome = ""; break
            case ("afk"): nome = msg.displayName; break
        }
        client.privmsg(msg.channelName, `${nome} ${chatRes === undefined ? "command executed" : chatRes}`)
        await db("commands").where("name", command.config.name).increment("uses", 1)
    }
    catch (err) {
        log.error(`Could not run the command ${command.config.name}: ${err}`)
    }
    
})