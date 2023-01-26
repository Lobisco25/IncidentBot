const axios = require("axios")
const cheerio = require("cheerio")
const translate = require("translate-google")

exports.run = async (client, msg, args, cmd) => {
    const res = await axios.get("https://www.bestrandoms.com/random-weird-facts")


    const $ = cheerio.load(res.data)
    const facts = $(".content .list-unstyled").map((i, e) => {
        const fact = $($(e).children()[1]).text()
        return { fact }
    })
    const translation = await translate(facts[0].fact.replace("[Amazing]", " "), { from: 'en', to: 'pt' })
    let say = {
        pt: `pajaScoots ${translation.replace("[Incrível]", " ")}`,
        en: `pajaScoots ${facts[0].fact.replace("[amazing]", " ")}`
    }
    return say
}
module.exports.config = {
    name: "weirdfact",
    description: "Retorna um fato aleatório",
    aliases: ["fatos"],
    cooldown: 5000,
}
