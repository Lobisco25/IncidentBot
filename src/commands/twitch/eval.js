exports.run = (client, args, channel, tags, message, user) => {
 if(!(tags.username == "bytter_" || tags.username == "lobisco25" || tags.username == "feridinha")) return;
 
 let evaled = eval(args.join(' '))
 client.say(channel, evaled)
 
}
module.exports.config = {
name: 'eval',
description: 'run a js command',
aliases: ['js']
}