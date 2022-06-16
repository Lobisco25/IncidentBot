const log = require("../../handlers/logger")

exports.run = async (client, args, channel, tags, message, user) => {
    try {
        log.debug(`Executando eval: ${args.join(" ")}`)
        const evaled = eval(args.join(" "))
        await client.say(channel, evaled.toString())
    } catch (err) {
        log.debug(`Erro eval: ${err.message}}`)
        await client.say(channel, "Erro: " + err.message)
    }
}
module.exports.config = {
    name: "eval",
    description: "Roda um comando JavaScript",
    aliases: ["js"],
    adminOnly: true,
}
