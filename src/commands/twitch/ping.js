const prettyMilliseconds = require("pretty-ms")
const os = require('os');
exports.run = (client, args, channel, tags, message) => {
    var uptime = Math.floor(process.uptime() * 1000)
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const memoria = Math.round(used * 100) / 100
    const serverUptime = os.uptime() * 1000
    client.ping().then((data) => {
        let ping = Math.floor(Math.round(data * 1000))

        client.say(
            channel,
            `@${
                tags.username
            } PONG! pajaDink Ping: ${ping}ms | Uptime: ${prettyMilliseconds(uptime)} | Uptime do server: ${prettyMilliseconds(serverUptime)} | Memória: ${memoria}MB`
        )
    })
}
module.exports.config = {
    name: "ping",
    description: "Pinga o TMI e fala o uptime e o tanto de ram utilizada",
    aliases: ["pong"],
    cooldown: 5000,
}
