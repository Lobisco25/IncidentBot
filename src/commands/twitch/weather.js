const axios = require("axios")
const UserModel = require("../../models/User")
const log = require("../../handlers/logger")

async function getUserCity(msg) {
    const result = await UserModel.findOne({twitch_id: msg.senderUsername})
        .catch((err) => log.error("Erro ao buscar cidade de usuário: " + err))
    return result?.city
}

exports.run = async (client, msg, args, cmd) => {
    try {
    var city = args.length < 1 ? await getUserCity(msg) : args.join(" ")
    if (!city) {
        let say = {
            pt: "nenhum lugar mencionado",
            en: "no place provided"
        }
        return say
    }
    city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${city}`)
      
            let clouds = res.data.current.cloud
            let emoji = null
            switch (true) {
                case (clouds < 20):
                    emoji = "☀"
                    break
                case (clouds < 50):
                    emoji = "🌥"
                    break
                case (clouds < 100):
                    emoji = "☁"
                    break
            }
            let say = {
                pt: `${emoji} ${city}: ${res.data.current.temp_c}°C (${res.data.current.temp_f}°F) | Sensação térmica de ${res.data.current.feelslike_c}°C (${res.data.current.feelslike_f}°F) | Umidade: ${res.data.current.humidity}% | Ventos: ${res.data.current.wind_kph}km/h | Nuvens: ${res.data.current.cloud}%`,
                en: `${emoji} ${city}: ${res.data.current.temp_c}°C (${res.data.current.temp_f}°F) | Feels like ${res.data.current.feelslike_c}°C (${res.data.current.feelslike_f}°F) | Humidity ${res.data.current.humidity}% | Wind: ${res.data.current.wind_kph}km/h | Clouds: ${res.data.current.cloud}%`
            }
            return say
        
    }
        catch(err) {
            log.error("Erro ao pegar clima de um usuário " + err)
            let say = {
                pt: "não consegui achar o clima deste lugar",
                en: "i couldn't find the weather for this location"
            }
            return say
        }
}
module.exports.config = {
    name: "weather",
    description: "Pega o clima de uma cidade",
    aliases: [""],
    cooldown: 3000
}
