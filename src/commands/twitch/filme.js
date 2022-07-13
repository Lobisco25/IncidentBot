const axios = require("axios")
const cheerio = require("cheerio")

exports.run = async (client, args, channel, tags, message, user) => {
    axios
        .get("https://www.bestrandoms.com/random-movie-generator")
        .then(async (res) => {
            const $ = await cheerio.load(res.data)
            const movies = $(".content .list-unstyled li").map((i, e) => {
                const name = $($(e).children()[1]).text()
                const rating = $($(e).children()[2]).text()
                const description = $($(e).children()[3]).text()

                return { name, description, rating }
            })

            const r = Math.floor(Math.random() * 6)
            await client.say(
                channel,
                `Nome: ${movies[r].name}, descrição: "${movies[r].description}", ${movies[r].rating}`
            )
        })
}
module.exports.config = {
    name: "filme",
    description: "Retorna um filme aleatório",
    aliases: ["rmovie", "randomfilme", "rfilme"],
    cooldown: 5000,
}
