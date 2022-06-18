const axios = require("axios")

exports.run = (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://dog-api.kinduff.com/api/facts",
    }).then(async (res) => {
        await client.say(
            channel,
            `@${tags.username}, pajaScoots ${res.data.facts}`
        )
    })
}
module.exports.config = {
    name: "dogfact",
    description: "Retorna um fato aleatório sobre cahorros",
    aliases: ["df"],
    cooldown: 5000,
}
