const prettyMilliseconds = require("pretty-ms")
const os = require('os');
exports.run = async (client, args, channel, tags, message) => {
    var uptime = Math.floor(process.uptime() * 1000)
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const memoria = Math.round(used * 100) / 100
    const serverUptime = os.uptime() * 1000

    let ping = Math.floor(Math.round(await client.ping() * 1000))

    let say = {
        pt: `PONG! pajaDink Ping: ${ping}ms | Uptime: ${prettyMilliseconds(uptime)} | Uptime do server: ${prettyMilliseconds(serverUptime)} | Memória: ${memoria}MB`,
        en: `PONG! pajaDink Ping: ${ping}ms | Uptime: ${prettyMilliseconds(uptime)} | Server's uptime: ${prettyMilliseconds(serverUptime)} | RAM: ${memoria}MB`
    }
    return say
}
module.exports.config = {
    name: "ping",
    description: "Pinga o TMI e fala o uptime e o tanto de ram utilizada",
    aliases: ["pong"],
    cooldown: 5000,
}
