const axios = require("axios")
exports.run = async (client, msg, args, cmd) => {
    async function getNews(lang) {
        let query = null

        switch (args[0]) {
            case (undefined):
                query = ""
                break
            default:
                query = `&q=${args.join("")}`
                break
        }
        let link = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_TOKEN}${query}&language=${lang}`
        console.log(link)
        const res = await axios.get(link)
        const r = Math.floor(Math.random() * res.data.results.length)
        const resul = res.data.results[r]
        if (resul === undefined) return;
        if (resul.description === undefined) return;
        let description = resul.description
        let category = resul.category
        let source = resul.source_id
        return { description, category, source }
    }

    let ptRes = await getNews("pt")
    let enRes = await getNews("en")



    let say = {
        pt: () => {
            if (ptRes === undefined || ptRes.description === undefined) return "Eu não consegui achar nenhuma notícia com essa query pajaDent"
            else return `${ptRes.description}, (categoria: ${ptRes.category}, fonte: ${ptRes.source})`
        },
        en: () => {
            if (enRes === undefined || ptRes.description === undefined) return "I couldn't find a news with that query pajaDent"

            else return `${enRes.description}, (category: ${enRes.category}, source: ${enRes.source})`
        }
    }
    return say

}
module.exports.config = {
    name: "news",
    description: "Retorna uma notícia (random ou correspondente a query)",
    aliases: ["noticias"],
    cooldown: 5000,
}