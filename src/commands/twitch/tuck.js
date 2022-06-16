exports.run = (client, args, channel, tags, message, user) => {
 if(!args[1]) {
    client.say(channel, `${tags.username}, você colocou ${args[0]} na cama :) 🛏 `)
 }
 else {
    client.say(channel, `${tags.username}, você colocou ${args[0]} na cama ${args[1]} 👉 🛏 `)
 }
}
module.exports.config = {
name: 'tuck',
description: 'Coloca o usuário especificado na cama',
aliases: ['bytter']
}