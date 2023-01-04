const utils = require("./../utils")
exports.run = async (client, msg, args, cmd) => {
    return "pajaH " + await utils.upload("https://cataas.com/cat")
}
module.exports.config = {
    name: 'cat',
    description: 'command',
    aliases: ['catass', 'randomcat', 'rcat']
}