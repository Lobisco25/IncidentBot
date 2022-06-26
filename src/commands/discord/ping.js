const client = require("../../services/discord")
const tmiClient = require("../../services/tmi")

const prettyMilliseconds = require("pretty-ms")

exports.run = (discord, args, message) => {
    message.reply("Pinging....").then((msg) => {
        const ping = msg.createdTimestamp - message.createdTimestamp
        const uptime = Math.floor(process.uptime() * 1000)
        tmiClient.ping().then((data) => {
            let Ping = Math.floor(Math.round(data * 1000))
            msg.edit(
                `ping do discord: ${ping}ms | ping do tmi: ${Ping} uptime: ${prettyMilliseconds(
                    uptime
                )}`
            )
        })
    })
}

module.exports.config = {
    name: "ping",
    description: "Retorna um ping do servidor",
    aliases: [],
}
