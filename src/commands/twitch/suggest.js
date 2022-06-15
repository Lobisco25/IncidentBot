const SuggestModel = require("../../models/Suggest.js")
exports.run = async (client, args, channel, tags, message, user) => {
    await SuggestModel.create({
        author_name: tags.username,
        message: args.join(" "),
    })
    client.say(channel, `A sua sugestão foi anotada!`)

   
}
module.exports.config = {
    name: "suggest",
    description: "Manda uma sugestão para o bot",
    cooldown: 5000,
    aliases: ["sg"],
}
