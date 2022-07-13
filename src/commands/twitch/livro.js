const axios = require("axios")
const cheerio = require("cheerio")

exports.run = (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://www.bestrandoms.com/random-book-generator",
    }).then(async (res) => {
        const $ = await cheerio.load(res.data)
        const movies = $(".content .list-unstyled .col-sm-6").map((i, e) => {
            const name = $($(e).children()[0]).text()
            const author = $($(e).children()[1]).text()

            return { name, author }
        })

        const r = Math.floor(Math.random() * 6)
        client.say(channel, `Livro: ${movies[r].name} ${movies[r].author}`)
    })
}
module.exports.config = {
    name: "livro",
    description: "Retorna um filme aleatório",
    aliases: ["rmovie", "randomfilme", "rfilme"],
    cooldown: 5000,
}
