const axios = require("axios")
const cheerio = require("cheerio")
const translate = require("translate-google")

exports.run = async (client, args, channel, tags, message, user) => {
    const res = await axios.get("https://www.bestrandoms.com/random-movie-generator")

    const $ = cheerio.load(res.data)
    const movie = $(".content .list-unstyled li").map((i, e) => {
        const name = $($(e).children()[2]).text()
        const trailer = $($($(e).children()[5]).children()[0]).attr(
            "data-trailer"
        )
        const description = $($(e).children()[3]).text()

        return { name, description, trailer }
    })

    const translation = await translate(movie[0].description, { from: "en", to: "pt", })

    const Trailer = movie[0].trailer === "" ? "" : `, trailer: https://www.youtube.com/watch?v=${movie[0].trailer}`
    let say = {
        pt: `Nome: ${movie[0].name}, ${translation}${Trailer}`,
        en: `Name: ${movie[0].name}, ${movie[0].description}${Trailer}`
    }
    return say

}
module.exports.config = {
    name: "movie",
    description: "Retorna um filme aleatório",
    aliases: ["rmovie", "randomfilme", "rfilme", "filme"],
    cooldown: 5000,
}
