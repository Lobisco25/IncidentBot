exports.run = (client, args, channel, tags, message, user) => {
    const commandsName = Object.keys(client.commands)
    var result = []
    commandsName.forEach(cmdName => {
        if(!client.commands[cmdName].config.adminOnly){
            result.push(client.commands[cmdName].config.name)
        }
    })
    client.say(channel, `Os comandos são: ${result.join(", ")} :)`)
}
module.exports.config = {
    name: "help",
    description: "Mostra todos os comandos do bot",
    aliases: ["commands"],
}
