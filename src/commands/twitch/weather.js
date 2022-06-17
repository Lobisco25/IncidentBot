const axios = require("axios")
const UserModel = require("../../models/User")
const log = require("../../handlers/logger")

async function getUserCity(tags) {
    const result = await UserModel.findOne({
        twitch_id: tags["user-id"],
    }).catch((err) => log.error("Erro ao buscar cidade de usuário: " + err))
    return result?.city
}

exports.run = async (client, args, channel, tags, message, user) => {
    var city = args.length < 1 ? await getUserCity(tags) : args.join(" ")
    if (!city) {
        await client.say(channel, `${tags.username}, Informe uma cidade`)
        return
    }
    city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    await axios
        .get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${city}`
        )
        .then(async (res) => {
            await client.say(
                channel,
                `@${tags.username}, Agora faz ${res.data.current.temp_c}°C | Sensação térmica de ${res.data.current.feelslike_c}°C | Umidade de ${res.data.current.humidity}% | Ventos de ${res.data.current.wind_kph}km/h | Nuvens: ${res.data.current.cloud}%`
            )
        })
        .catch(async (err) => {
            log.error("Erro ao pegar clima de um usuário " + err)
            await client.say(
                channel,
                `@${tags.username}, não consegui achar o clima dessa cidade FeelsBadMan`
            )
        })
}
module.exports.config = {
    name: "weather",
    description: "Pega o clima de uma cidade",
    aliases: [""],
}
