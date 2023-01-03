const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    return `pajaDink ping: ${await client._ping()} | usage: ${utils.usage} | uptime: ${utils.uptime} | os uptime: ${utils.osUptime}`
}
module.exports.config = {
    name: 'ping',
    description: 'command',
    aliases: ['pong']
}