exports.run = async function (client, args, channel, tags, message, user) {
    const api = require('../services/twitch.js')
    const userGet = await api.users.getUserByName(args[0])
    client.say(channel, `@${userGet.displayName} | ${userGet.id} | Criado em: ${userGet.creationDate} | Bio: ${userGet.description} | Foto de Perfil: ${userGet.profilePictureUrl}`)

}
module.exports.config = {
name: 'cli',
description: '',
aliases: ['user']
}