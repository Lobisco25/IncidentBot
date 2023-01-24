import utils from "../utils"
export const run = async (client, msg, args, cmd) => {
    return "pajaH " + await utils.upload("https://source.unsplash.com/random/?dog")
}
export let config = {
name: 'dog',
description: '',
aliases: ['rdog', 'randomdog'],
cooldown: 5000
}
export let cooldownUsers = []