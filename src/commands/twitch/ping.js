const prettyMilliseconds = require("pretty-ms")
const os = require('os');
exports.run = async (client, msg, args, cmd) => {
    var uptime = Math.floor(process.uptime() * 1000)
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const memoria = Math.round(used * 100) / 100
    const serverUptime = os.uptime() * 1000

    const asd = Date.now();
    await client.ping();
    let ping = Date.now() - asd

    let say = {
        pt: `PONG! pajaDink Ping: ${ping}ms | Uptime: ${prettyMilliseconds(uptime)} | Uptime do server: ${prettyMilliseconds(serverUptime)} | Memória: ${memoria}MB`,
        en: `PONG! pajaDink Ping: ${ping}ms | Uptime: ${prettyMilliseconds(uptime)} | Server's uptime: ${prettyMilliseconds(serverUptime)} | RAM: ${memoria}MB`
    }
    return say
}
module.exports.config = {
    name: "ping",
    description: "Retorna informações técnicas sobre o bot",
    aliases: ["pong"],
    cooldown: 5000,
}
