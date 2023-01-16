exports.run = async (client, msg, args, cmd) => {
if (!args[0]) return "no arguments provided"
const random = Math.floor(Math.random() * args.length)
return args[random]
}
module.exports.config = {
    name: 'pick',
    description: '',
    aliases: [''],
    cooldown: 5000
}