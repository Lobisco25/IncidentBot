const axios = require("axios")

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) {
        client.say(channel, "moeda invalida! pajaDank ")
        return
    }
    const endpoints = ["usd", "eur", "btc", "gbp"]

    const currency = async (endpoint) => {
        const res = await axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${endpoint}.json`
        )
        return res
    }

    switch (args[0]) {
        case "dolar":
            currency(endpoints[0]).then((res) => {
                if (!args[1]) {
                    client.say(
                        channel,
                        `Um dolar é igual a R$${res.data.usd.brl
                            .toString()
                            .substring(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const usd = res.data.usd.brl
                    const math = usd * args[1]
                    client.say(channel, "R$" + math.toString().substring(0, 5))
                }
            })

            break
        case "euro":
            currency(endpoints[1]).then((res) => {
                if (!args[1]) {
                    client.say(
                        channel,
                        `Um euro é igual a R${res.data.eur.brl
                            .toString()
                            .substring(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const euro = res.data.eur.brl
                    const math = euro * args[1]
                    client.say(channel, "R$" + math.toString().substring(0, 5))
                }
            })
            break
        case "bitcoin":
        case "btc":
            currency(endpoints[2]).then((res) => {
                if (!args[1]) {
                    client.say(
                        channel,
                        `Um bitcoin é igual a R$${res.data.btc.brl}`
                    )
                } else if (Number(args[1])) {
                    const btc = res.data.btc.brl
                    const math = btc * args[1]
                    client.say(channel, "R$" + math.toString().substring(0, 5))
                }
            })
            break
        case "libra":
            currency(endpoints[3]).then((res) => {
                if (!args[1]) {
                    client.say(
                        channel,
                        `Uma libra é igual a R$${res.data.gbp.brl
                            .toString()
                            .substring(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const gbp = res.data.gbp.brl
                    const math = gbp * args[1]
                    client.say(channel, "R$" + math.toString().substring(0, 5))
                }
            })
            break
    }
}
module.exports.config = {
    name: "currency",
    description: "As moedas convertidas em real",
    aliases: [],
    cooldown: 5000,
}
