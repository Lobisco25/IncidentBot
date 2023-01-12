const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    return "pajaH " + await utils.upload("https://source.unsplash.com/random/?dog")
}
module.exports.config = {
name: 'dog',
description: '',
aliases: ['rdog', 'randomdog'],
cooldown: 5000
}