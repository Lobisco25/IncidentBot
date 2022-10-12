const axios = require("axios")
const cheerio = require("cheerio")
const translate = require("translate-google")

exports.run = async (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://www.bestrandoms.com/random-movie-generator",
    }).then(async (res) => {
        const $ = cheerio.load(res.data)
        const movie = $(".content .list-unstyled li").map((i, e) => {
            const name = $($(e).children()[2]).text()
            const trailer = $($($(e).children()[5]).children()[0]).attr(
                "data-trailer"
            )
            const description = $($(e).children()[3]).text()

            return { name, description, trailer }
        })

        const translation = await translate(movie[0].description, {
            from: "en",
            to: "pt",
        })

        const Trailer =
            movie[0].trailer === "" ? "" : `trailer: https://www.youtube.com/watch?v=${movie[0].trailer}`
        await client.say(
            channel,
            `Nome: ${movie[0].name}, ${translation}, ${Trailer}`
        )
    })
}
module.exports.config = {
    name: "filme",
    description: "Retorna um filme aleatório",
    aliases: ["rmovie", "randomfilme", "rfilme", "movie"],
    cooldown: 5000,
}
