const log = require("../../handlers/logger")

exports.run = async (client, msg, args, cmd) => {
    try {
    const evaled = await eval(`(async () => { ${args.join(" ")} })()`)

        if(typeof evaled === 'string') {
            console.log(evaled)
            let say = {
                pt: evaled.toString(),
                en: evaled.toString()
            }
            log.debug(`Executando eval: ${args.join(" ")} | ${evaled}`)
            return say
        }

        else {
            evaled
            let say = {
                pt: " ",
                en: " "
            }
            log.debug(`Executando eval: ${args.join(" ")}`)
            return say
        }


    } catch (err) {
        log.debug(`Erro eval: ${err.message}`)
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
