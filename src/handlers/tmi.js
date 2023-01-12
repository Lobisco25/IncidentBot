const fs = require("fs")
const config = require("../../config")
const client = require("../services/tmi")
const db = require("../services/db")
const log = require("../log")
const utils = require("../")

client.commands = {}

// get files
fs.readdir(__dirname + "/../commands/", (err, files) => {
    if (err) return log.error(`Couldn't read command folder (${err})`)

    const jsfile = files.filter((f) => f.split(".").pop() == "js")
    jsfile.forEach(async (f) => {
        let pull = require(`../commands/${f}`)
        pull.cooldownUsers = []
        client.commands[pull.config.name] = pull
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
function setUserCooldown(c, msg) {
    const userId = msg.senderUsername == config.dev ? "12345" : msg.senderUserID
    client.commands[c.config.name].cooldownUsers.push(userId)

    setTimeout(() => {
        client.commands[c.config.name].cooldownUsers = client.commands[
            c.config.name
        ].cooldownUsers.filter((i) => i !== msg.senderUserID)
    }, c.config.cooldown)
}

function getCommandByAlias(alias) {
    var result = null
    Object.keys(client.commands).every((c) => {
        if (client.commands[c].config.aliases.includes(alias)) {
            result = client.commands[c]
            return false
        }
        return true
    })
    return result
}

// main function
client.on("PRIVMSG", async (msg) => {
    //msg extra variables
    msg.isBroadcaster = msg.badgesRaw.startsWith("broadcaster/")
    msg.isVip = !!msg.ircTags?.vip
    msg.isSelf = msg.senderUserID === config.botID

    if (msg.isSelf) return

    // variables
    const prefix = (await getPrefix(msg) || config.prefix)
    let args = msg.messageText.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    let command = client.commands[cmd] || getCommandByAlias(cmd)

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
    setUserCooldown(command, msg)
})