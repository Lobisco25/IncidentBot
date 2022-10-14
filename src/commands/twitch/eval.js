const log = require("../../handlers/logger")

exports.run = async (client, args, channel, tags, message, user) => {
    try {
        log.debug(`Executando eval: ${args.join(" ")}`)
        const evaled = await eval(args.join(" "))
        let say = {
            pt: evaled.toString(),
            en: evaled.toString()
        }
        return say

    } catch (err) {
        log.debug(`Erro eval: ${err.message}}`)
        let say = {
            pt: `pajaAAAAAAAAAAA Erro: ${err.message}`,
            en: `pajaAAAAAAAAAAA Error: ${err.message}`
        }
        return say
    }
}
module.exports.config = {
    name: "eval",
    description: "Roda um comando JavaScript",
    aliases: ["js"],
    adminOnly: true,
}
