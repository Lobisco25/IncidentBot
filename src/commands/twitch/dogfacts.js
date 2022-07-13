const axios = require("axios")
const translate = require('translate-google')

exports.run = async (client, args, channel, tags, message, user) => {

    const response = await axios.get("https://dog-api.kinduff.com/api/facts")

    const translation =  await translate(response.data.facts, {from: 'en', to: 'pt'})

    await client.say(
        channel,
        `@${tags.username}, pajaScoots ${translation}`
        )
}
module.exports.config = {
    name: "dogfact",
    description: "Retorna um fato aleatório sobre cachorros",
    aliases: ["df"],
    cooldown: 5000,
}
