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

async function getCustomPrefix(channel) {
    const result = await ChannelModel.findOne({ twitch_name: channel }).catch(
        (err) => {
            log.error("Ocorreu um erro ao buscar prefixo do canal: " + err)
        }
    )
    return result?.customPrefix
}

function setUserCooldown(c, tags) {
    client.commands[c.config.name].cooldownUsers.push(tags["user-id"])
    setTimeout(() => {
        client.commands[c.config.name].cooldownUsers = client.commands[
            c.config.name
        ].cooldownUsers.filter((i) => i !== tags["user-id"])
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

client.on("message", async (channel, tags, message, self) => {
    if (self) return
    channel = channel.replace("#", "") // Remove o padrão dos canais começarem com #
    const prefix = (await getCustomPrefix(channel)) || defaultPrefix

    let args = message.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    tags.source = cmd
    let command = client.commands[cmd] || getCommandByAlias(cmd)
    const channelDB = await ChannelModel.findOne({ twitch_name: channel })

    if (!command || !message.startsWith(prefix)) return
    if (command.cooldownUsers.includes(tags["user-id"])) return
    if (
        (command.config.adminOnly &&
            !["feridinha", "bytter_", "lobisco25"].includes(tags.username)) ||
        (command.config.streamerOnly &&
            ![tags["user-id"]].includes(tags["room-id"]))
    )
        return

    let chatResponse = await command.run(client, args, channel, tags)
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
                nome = tags.username + ","
                break
            case ("eval"):
                nome = ""
                break
            case ("afk"):
                nome = tags.username
        }

        client.say(channel, `[DEV] ${nome} ${chatres}`)
    } catch (err) {
        log.error(`Ocorreu um erro ao rodar um comando: ${err}`)
        client.say(channel, "pajaAAAAAAAAAAA error")
    }

    setUserCooldown(command, tags)
})
