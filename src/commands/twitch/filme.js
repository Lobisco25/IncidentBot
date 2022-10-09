const axios = require("axios")
const cheerio = require("cheerio")
const translate = require("translate-google")

exports.run = async (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://www.bestrandoms.com/random-movie-generator",
    }).then(async (res) => {
        const $ = cheerio.load(res.data)
        const movies = $(".content .list-unstyled li").map((i, e) => {
            const name = $($(e).children()[2]).text()
            const description = $($(e).children()[3]).text()

            return { name, description }
        })

        const translation = await translate(movies[0].description, {
            from: "en",
            to: "pt",
        })

        console.log(movies[0])
        await client.say(channel, `Nome: ${movies[0].name}, "${translation}",`)
    })
}
module.exports.config = {
    name: "filme",
    description: "Retorna um filme aleatório",
    aliases: ["rmovie", "randomfilme", "rfilme", "movie"],
    cooldown: 5000,
}
