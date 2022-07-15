const axios = require("axios")
const cheerio = require("cheerio")

exports.run = (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://www.bestrandoms.com/random-book-generator",
    }).then(async (res) => {
        const $ = await cheerio.load(res.data)
        const book = $(".content .list-unstyled .col-sm-6").map((i, e) => {
            const name = $($(e).children()[0]).text()
            const author = $($(e).children()[1]).text()

            return { name, author }
        })

        client.say(channel, `Livro: ${book[0].name} ${book[0].author}`)
    })
}
module.exports.config = {
    name: "livro",
    description: "Retorna um livro aleatório",
    aliases: ["book", "rlivro", "rbook", "randomlivro", "randombook"],
    cooldown: 5000,
}
