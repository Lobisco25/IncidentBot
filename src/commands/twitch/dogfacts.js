const axios = require("axios")
const translate = require('translate-google')

exports.run = async (client, msg, args, cmd) => {

    const response = await axios.get("https://dog-api.kinduff.com/api/facts")

    const translation = await translate(response.data.facts, { from: 'en', to: 'pt' })

    let say = {
        pt: `pajaScoots ${translation}`,
        en: `pajaScoots ${response.data.facts}`
    }
    return say
}
module.exports.config = {
    name: "dogfact",
    description: "Retorna um fato aleatório sobre cachorros",
    aliases: ["df"],
    cooldown: 5000,
}
