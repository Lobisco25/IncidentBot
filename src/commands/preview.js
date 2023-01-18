exports.run = async (client, msg, args, cmd) => {
    if(!args[0]) return "provide a twitch username"
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${args[0]}.jpg?xNA `
}
module.exports.config = {
    name: 'preview',
    description: '',
    aliases: ['prev', 'thumbnail'],
    cooldown: 5000
}