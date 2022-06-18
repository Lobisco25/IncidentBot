const axios = require("axios")
exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) {
        axios
            .get (
                `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_TOKEN}&language=pt`
            )
            .then(async (res) => {
                const random = Math.floor(Math.random() * 10)
                let resul = res.data.results[random]
                await client.say(channel, `${resul.description}, (categoria: ${resul.category}, fonte: ${resul.source_id})`)
            })
    } else {
        axios
            .get (
                `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_TOKEN}&q=${args[0]}&language=pt `
            )
            .then(async (res) => {
                const random = Math.floor(Math.random() * 10)
                let resul = res.data.results[random]
                await client.say(channel, `${resul.description}, (categoria: ${resul.category}, fonte: ${resul.source_id})`)
            })
    }
}
module.exports.config = {
    name: "news",
    description: "As noticias do mundo",
    cooldown: 5000,
    aliases: ["noticias"],
}
