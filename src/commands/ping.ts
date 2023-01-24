import utils from "../utils"
export const run = async (client, msg, args, cmd) => {
    return `pajaDink ping: ${await utils.ping()} | usage: ${utils.usage} | uptime: ${utils.uptime} | os uptime: ${utils.osUptime}`
}
export let config = {
    name: 'ping',
    description: 'command',
    aliases: ['pong']
}
export let cooldownUsers = []