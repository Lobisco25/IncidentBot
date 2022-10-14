exports.run = (client, args, channel, tags, message, user) => {
    const commandsName = Object.keys(client.commands)
    var result = []
    commandsName.forEach(cmdName => {
        if(client.commands[cmdName].config.adminOnly){
            result.push(client.commands[cmdName].config.name)
        }
    })
    let say = {
       pt: `pajaCult Os comandos de admin são: ${result.join(", ")} :)`,
       en: `pajaCult The admin commands are: ${result.join(", ")} :)`
    }
    return say
}
module.exports.config = {
    name: "adminhelp",
    description: "manda os comandos de admin",
    aliases: ["admin", "admincommands"],
    adminOnly: true,
}
