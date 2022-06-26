const axios = require("axios")

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) {
        client.say(channel, "moeda invalida! pajaDank ")
        return
    }
    const endpoints = [
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json",
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json",
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json",
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/gbp.json",
    ]
    switch (args[0]) {
        case "dolar":
            axios.get(endpoints[0]).then(async (res) => {
                if (!args[1]) {
                    await client.say(
                        channel,
                        `1 dolar é igual a R$${res.data.usd.brl
                            .toString()
                            .slice(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const math = res.data.usd.brl * args[1]
                    await client.say(
                        channel,
                        `R$${math.toString().slice(0, 5)}`
                    )
                }
            })
            break
        case "euro":
            axios.get(endpoints[1]).then(async (res) => {
                if (!args[1]) {
                    await client.say(
                        channel,
                        `1 euro é igual a R$${res.data.eur.brl
                            .toString()
                            .slice(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const math = res.data.eur.brl * args[1]
                    await client.say(
                        channel,
                        `R$${math.toString().slice(0, 5)}`
                    )
                }
            })
            break
        case "bitcoin":
        case "btc":
            axios.get(endpoints[2]).then(async (res) => {
                if (!args[1]) {
                    await client.say(
                        channel,
                        `1 bitcoin é igual a R$${res.data.btc.brl
                            .toString()
                            .slice(0, 6)}`
                    )
                } else if (Number(args[1])) {
                    const math = res.data.btc.brl * args[1]
                    await client.say(
                        channel,
                        `R$${math.toString().slice(0, 5)}`
                    )
                }
            })
            break
        case "libra":
            axios.get(endpoints[3]).then(async (res) => {
                if (!args[1]) {
                    await client.say(
                        channel,
                        `1 libra é igual a R$${res.data.gbp.brl
                            .toString()
                            .slice(0, 4)}`
                    )
                } else if (Number(args[1])) {
                    const math = res.data.gbp.brl * args[1]
                    await client.say(
                        channel,
                        `R$${math.toString().slice(0, 5)}`
                    )
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