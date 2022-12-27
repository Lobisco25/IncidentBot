const fs = require("fs")
const client = require("../services/tmi")
const ChannelModel = require("../models/Channel")
const log = require("./logger")
const defaultPrefix = "-"

client.commands = {}

fs.readdir(__dirname + "/../commands/twitch", (err, files) => {
    if (err) return log.error(err)

    const jsfile = files.filter((f) => f.split(".").pop() == "js")
    jsfile.forEach((f, i) => {
        let pull = require(`../commands/twitch/${f}`)
        pull.cooldownUsers = []
        client.commands[pull.config.name] = pull
    })
})

async function getCustomPrefix(msg) {
    const result = await ChannelModel.findOne({ twitch_name: msg.channelName }).catch(
        (err) => {
            log.error("Ocorreu um erro ao buscar prefixo do canal: " + err)
        }
    )
    return result?.customPrefix
}

function setUserCooldown(c, msg) {
    client.commands[c.config.name].cooldownUsers.push(msg.senderUserID)
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

client.on("PRIVMSG", async (msg) => {

    msg.isBroadcaster = msg.badgesRaw.startsWith(`broadcaster/`)
	msg.isVip = !!msg.ircTags?.vip

	msg.isSelf = msg.senderUserID === "795277041"
	msg.userPing = msg.isSelf ? `` : `@${msg.senderUsername}, `

    if(msg.isSelf) return

    const prefix = (await getCustomPrefix(msg)) || defaultPrefix

    let args = msg.messageText.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    let command = client.commands[cmd] || getCommandByAlias(cmd)
    const channelDB = await ChannelModel.findOne({ twitch_name: msg.channelName })

    if (!command || !msg.messageText.startsWith(prefix)) return
    if (command.cooldownUsers.includes(msg.senderUserID)) return
    if (
        (command.config.adminOnly && !["lobisco25"].includes(msg.senderUsername)) ||
         (command.config.streamerOnly && ![msg.channelID].includes(msg.senderUserID)))
        return

    let chatResponse = await command.run(client, msg, args, cmd)
    let chatres = null
    try {
        switch (channelDB.lang) {
            default:
                switch (command.config.name) {
                    default:
                        chatres = chatResponse.pt
                        break
                    case ("news"):
                        chatres = chatResponse.pt()
                        break
                }
                break
            case (null):
                switch (command.config.name) {
                    default:
                        chatres = chatResponse.pt
                        break
                    case ("news"):
                        chatres = chatResponse.pt()
                        break
                }
            case ("en"):
                switch (command.config.name) {
                    default:
                        chatres = chatResponse.en
                        break
                    case ("news"):
                        chatres = chatResponse.en()
                        break
                }
                break
        }
        let nome = null

        switch (command.config.name) {
            default:
                nome = msg.displayName + ","
                break
            case ("eval"):
                nome = ""
                break
            case ("afk"):
                nome = msg.displayName
        }

        client.privmsg(msg.channelName, `${nome} ${chatres}`)
    } catch (err) {
        log.error(`Ocorreu um erro ao rodar um comando: ${err}`)
        client.privmsg(msg.channelName, "pajaAAAAAAAAAAA error")
    }

    setUserCooldown(command, msg)
})
