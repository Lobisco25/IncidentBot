const axios = require("axios")
const cheerio = require("cheerio")

exports.run = async (client, msg, args, cmd) => {
    const res = await axios.get("https://www.bestrandoms.com/random-book-generator")

    const $ = await cheerio.load(res.data)
    const book = $(".content .list-unstyled .col-sm-6").map((i, e) => {
        const name = $($(e).children()[1]).text()
        const author = $($(e).children()[2]).text()

        return { name, author }
    })

    let say = {
        pt: `${book[4].name} by ${book[4].author}`,
        en: `${book[4].name} by ${book[4].author}`
    }
    return say


}
module.exports.config = {
    name: "book",
    description: "Retorna um livro aleatório",
    aliases: ["livro", "rlivro", "rbook", "randomlivro", "randombook"],
    cooldown: 5000,
}
