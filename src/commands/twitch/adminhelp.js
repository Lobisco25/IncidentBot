exports.run = (client, args, channel, tags, message, user) => {
    const commandsName = Object.keys(client.commands)
    var result = []
    commandsName.forEach(cmdName => {
        if(client.commands[cmdName].config.adminOnly){
            result.push(client.commands[cmdName].config.name)
        }
    })
    client.say(channel, `pajaCult Os comandos de admin são: ${result.join(", ")} :)`)
}
module.exports.config = {
    name: "adminhelp",
    description: "manda os comandos de admin",
    aliases: ["admin", "admincommands"],
    adminOnly: true,
}
