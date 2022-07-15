const axios = require("axios")
const cheerio = require("cheerio")
const translate = require("translate-google")

exports.run = async (client, args, channel, tags, message, user) => {
        axios({
            method: "GET",
            url: "https://www.bestrandoms.com/random-weird-facts"
        })

        .then(async (res) => {
            const $ = cheerio.load(res.data)
            const facts = $(".content .list-unstyled").map((i, e) => {
                const fact = $($(e).children()[1]).text()
                return { fact }
            }) 

            const translation =  await translate(facts[0].fact.replace("[Amazing]", " "), {from: 'en', to: 'pt'})
            client.say(
                channel,
                `${translation.replace("[Incrível]", " ")}`
            )

})
}
module.exports.config = {
    name: "weirdfact",
    description: "Retorna um fato aleatório",
    aliases: ["fatos"],
    cooldown: 5000,
}
