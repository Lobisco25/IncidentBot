const axios = require("axios")
exports.run = async (client, args, channel, tags, message, user) => {
    const r = Math.floor(Math.random() * 10)
    const endpoints = [
        `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_TOKEN}&q=noticias&language=pt`,
        `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_TOKEN}&q=${args[0]}&language=pt `,
    ]

    if (!args[0]) {
        const res = await axios.get(endpoints[0])
        const resul = res.data.results[r]

        await client.say(
            channel,
            `${resul.description}, (categoria: ${resul.category}, fonte: ${resul.source_id})`
        )
    } else {
        const res = await axios.get(endpoints[1])
        const resul = res.data.results[r]

        await client.say(
            channel,
            `${resul.description}, (categoria: ${resul.category}, fonte: ${resul.source_id})`
        )
    }
}
module.exports.config = {
    name: "news",
    description: "As noticias do mundo",
    cooldown: 5000,
    aliases: ["noticias"],
}