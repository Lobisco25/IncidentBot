exports.run = (client, args, channel, tags, message, user) => {
    const axios = require("axios")
    axios({
        method: "GET",
        url: `https://significado.herokuapp.com/v2/sinonimos/${args[0]}`,
        validateStatus: () => true,
    }).then((res) => {
        if (res.status == 400 || res.data[0] == undefined) {
            client.say(
                channel,
                `${tags.username}, essa palavra não está no dicionário FeelsDankMan`
            )
        } else if (res.data[0] == undefined) {
            client.say(channel, `${tags.username}, ${res.data[0].meanings[0]} `)
        } else {
            client.say(
                channel,
                `${tags.username}, pajaM 1: ${res.data[0]} | 2: ${res.data[1]}`
            )
        }
    })
}
module.exports.config = {
    name: "sinonimos",
    description: "Puxa uma sinônimos de uma palavra especifica do Dicio.com.br",
    aliases: ["sino", "sinônimos"],
}
