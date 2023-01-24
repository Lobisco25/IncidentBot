import utils from "../utils"
export const run = async (client, msg, args, cmd) => {
    return "pajaH " + await utils.upload("https://cataas.com/cat")
}
export let config = {
    name: 'cat',
    description: 'command',
    aliases: ['catass', 'randomcat', 'rcat']
}
export let cooldownUsers = []