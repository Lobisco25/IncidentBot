exports.run = (client, msg, args, cmd) => {
    const commandsName = Object.keys(client.commands)
    var result = []
    commandsName.forEach(cmdName => {
        if(!client.commands[cmdName].config.adminOnly){
            result.push(client.commands[cmdName].config.name)
        }
    })
    
    let say = {
        pt: `pajaCool Os comandos são: ${result.join(", ")} | Status do bot: https://status.boletinho.com/status/lobisco`,
        en: `pajaCool Commands:  ${result.join(", ")} | Bot statuss https://status.boletinho.com/status/lobisco`
    }
    
    return say
}
module.exports.config = {
    name: "help",
    description: "Mostra todos os comandos do bot",
    aliases: ["commands"],
    cooldown: 2000
}
