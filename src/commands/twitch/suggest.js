const SuggestModel = require("../../models/Suggest.js")
const log = require("../../handlers/logger")

exports.run = async (client, args, channel, tags, message, user) => {
    await SuggestModel.create({
        author_name: tags.username,
        message: args.join(" "),
    }).catch(err => { log.error("Erro ao criar uma sugestão ", err) })
    client.say(channel, `pajaH A sua sugestão foi anotada!`)
}

module.exports.config = {
    name: "suggest",
    description: "Manda uma sugestão para o bot",
    cooldown: 5000,
    aliases: ["sg"],
}
