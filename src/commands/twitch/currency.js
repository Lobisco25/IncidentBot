const axios = require("axios")

exports.run = async (client, args, channel, tags, message, user) => {
    const isnan = isNaN(Number(args[1]))
    if (!args[0] || !args[1] || isnan) {
        client.say(
            channel,
            "[DEV] Algo deu errado! Tente -currency dolar 1 pajaDank "
        )
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

    switch (args[0]) {
        case "dolar":
            const usd = await getCurrency(endpoints[0], "usd")
            client.say(channel, `${args[1]} USD = R$${usd}`)
            break
        case "euro":
            const eur = await getCurrency(endpoints[1], "eur")
            client.say(channel, `${args[1]} EUR = R$${eur}`)
            break
        case "bitcoin":
        case "btc":
            const btc = await getCurrency(endpoints[2], "btc")
            client.say(channel, `${args[1]} BTC = R$${btc}`)
            break
        case "libra":
            const libra = await getCurrency(endpoints[3], "gbp")
            client.say(channel, `${args[1]} GBP = R$${libra}`)
            break
    }
}
module.exports.config = {
    name: "currency",
    description: "As moedas convertidas em real",
    aliases: [],
    cooldown: 5000,
}
