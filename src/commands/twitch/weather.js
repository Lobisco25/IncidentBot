const axios = require("axios")

exports.run = async (client, args, channel, tags, message, user) => {
    var city = args
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    await axios
        .get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${city}`
        )
        .then(async (res) => {
            console.log(res.data)
            await client.say(
                channel,
                `@${tags.username}, Agora faz ${res.data.current.temp_c}°C | Sensação térmica de ${res.data.current.feelslike_c}°C | Umidade de ${res.data.current.humidity}% | Ventos de ${res.data.current.wind_kph}km/h | Nuvens: ${res.data.current.cloud}%`
            )
        })
        .catch((error) => console.log(error))
}
module.exports.config = {
    name: "weather",
    description: "DEPOIS EU ESCEBEO",
    aliases: [""],
}
