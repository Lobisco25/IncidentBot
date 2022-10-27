const axios = require("axios")

exports.run = async (client, msg, args, cmd) => {
    const isnan = isNaN(Number(args[1]))
    if (!args[0] || !args[1] || isnan) {
        return
    }
    const endpoints = ["usd", "eur", "btc", "gbp"]

    const currencyApi = async (endpoint) => {
        const res = await axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${endpoint}.json`
        )
        return res
    }

    async function getCurrency(endpoint, Currency) {
        const currency = currencyApi(endpoint).then((res) => {
            if (isnan) {
                return
            } else {
                const convertor = res.data[`${Currency}`].brl * args[1]
                return convertor.toString().substring(0, 4)
            }
        })
        return currency
    }
    let res = null
    switch (args[0]) {
        case "dolar":
            const usd = await getCurrency(endpoints[0], "usd")
            res = `${args[1]} USD = R$${usd}`
            break
        case "euro":
            const eur = await getCurrency(endpoints[1], "eur")
            res = `${args[1]} EUR = R$${eur}`
            break
        case "bitcoin":
        case "btc":
            const btc = await getCurrency(endpoints[2], "btc")
            res = `${args[1]} BTC = R$${btc}`
            break
        case "libra":
            const libra = await getCurrency(endpoints[3], "gbp")
            res = `${args[1]} GBP = R$${libra}`
            break
    }
    let say = {
        pt: res, 
        en: res
    }

    return say

}
module.exports.config = {
    name: "currency",
    description: "Retornas uma quantidade da moeda especificada em real",
    aliases: [],
    cooldown: 5000,
}
