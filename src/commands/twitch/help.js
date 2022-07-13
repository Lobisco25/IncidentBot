exports.run = (client, args, channel, tags, message, user) => {
    const commandsName = Object.keys(client.commands)
    var result = []
    commandsName.forEach(cmdName => {
        if(!client.commands[cmdName].config.adminOnly){
            result.push(client.commands[cmdName].config.name)
        }
    })
    client.say(channel, `pajaCool Os comandos são: ${result.join(", ")} | Status do bot: https://status.boletinho.com/status/lobisco`)
}
module.exports.config = {
    name: "help",
    description: "Mostra todos os comandos do bot",
    aliases: ["commands"],
}
