const axios = require("axios")

exports.run = (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://catfact.ninja/fact",
        headers: {
            accept: "application/json",
            "X-CSRF-TOKEN": "wm6xCeD2NhD8BJyZOB2u8tF4Ko2YPtkctS98A4Ag",
        },
    }).then(async (res) => {
        await client.say(
            channel,
            `@${tags.username}, pajaScoots ${res.data.fact}`
        )
    })
}
module.exports.config = {
    name: "catfact",
    description: "Retorna um fato aleatório sobre gatos",
    aliases: ["cf", "catfacts"],
    cooldown: 5000
}
