const axios = require("axios")

function getRandomEmote(res) {
    const emotesLength = res.data.length
    const rNum = Math.floor(Math.random() * emotesLength)
    const randomEmote = res.data[rNum].name
    return randomEmote 
}

exports.run = async (client, args, channel, tags, message, user) => {
    await axios
        .get(`https://api.7tv.app/v2/users/${channel}/emotes`)
        .then(async (res) => {
            const emotes = [getRandomEmote(res), getRandomEmote(res), getRandomEmote(res)]
            const emotesLength = res.data.length

            if(emotesLength < 30) {
                client.say(
                    channel, 
                    `${tags.username} para você poder usar a roleta, o chat precisa ter pelo menos 30 emotes na 7tv`
                )
            }

            else {
                await client.say(
                    channel,
                    `[ ${emotes[0]} ${emotes[1]} ${emotes[2]} ]`
                )
                //ferida aqui vc coloca pra o usuario ganhar uma quantidade especifica de trauma
                if(emotes[0] === emotes[1] && emotes[1] === emotes[2]) {
                    await client.say(
                        channel, 
                        `${tags.username} pajaPog Você ganhou alguma coisa`
                    )
                }
            }
        })
}
module.exports.config = {
    name: "roleta",
    description: "pega 3 emotes da 7tv",
    aliases: ["slots", "roleta7tv", "slots7tv"],
    cooldown: 15000
}