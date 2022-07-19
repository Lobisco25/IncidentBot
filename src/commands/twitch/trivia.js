const axios = require("axios")
const translate = require("translate-google")

exports.run = (client, args, channel, tags, message, user) => {
    axios({
        method: "GET",
        url: "https://the-trivia-api.com/api/questions?limit=1",
    }).then(async (res) => {
        const question = await translate(res.data[0].question, {from: "en",to: "pt",})
        const correctAnswer = res.data[0].correctAnswer
        const answer = await translate(correctAnswer, {from: "en",to: "pt",})
        const category = await translate(res.data[0].category, {from: "en",to: "pt",})
        client.say(channel, `${question} Categoria: ${category}`) 


        client.on("message", (channel, tags, message, self) => {
         if (message.toLowerCase() === answer.toLowerCase() || message.toLowerCase() === correctAnswer.toLowerCase()) {
            client.say(
                channel,
                `${tags.username}, você acertou +20 traumas pajaDespair`
            )
            return }
         })

         setTimeout(() => {
             client.say(
                 channel,
                 `FeelsBadMan Ninguém respondeu a tempo, resposta : ${answer}`
             ) 
             return
         }, 20000)
    })
}

module.exports.config = {
    name: "trivia",
    description: "Peguntas e respostas",
    aliases: ["quiz"],
   //  cooldown: 5000
}
