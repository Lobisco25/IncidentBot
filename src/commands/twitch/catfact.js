const axios = require("axios")
const translate = require("translate-google")

exports.run = async (client, args, channel, tags, message, user) => {
    const response = await axios({
        method: "GET",
        url: "https://catfact.ninja/fact",
        headers: {
            accept: "application/json",
            "X-CSRF-TOKEN": "wm6xCeD2NhD8BJyZOB2u8tF4Ko2YPtkctS98A4Ag",
        }
    })
    const translation =  await translate(response.data.fact, {from: 'en', to: 'pt'})

    let say = {
        pt: `pajaScoots ${translation}`,
        en: `pajaScoots ${response.data.fact}`
    }
    return say
}
module.exports.config = {
    name: "catfact",
    description: "Retorna um fato aleatório sobre gatos",
    aliases: ["cf", "catfacts"],
    cooldown: 5000
}
