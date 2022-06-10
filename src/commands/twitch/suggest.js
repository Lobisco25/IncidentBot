const SuggestModel = require("../../models/Suggest.js")

exports.run = (client, args, channel, tags, message, user) => {
    async function suggesting() {
        const user = await SuggestModel.create({
            author_name: tags.username,
            message: args.join(" "),
        })
        console.log(user)
        client.say(channel, `A sua sugestão foi anotada!`)
    }

    suggesting()
}
module.exports.config = {
    name: "suggest",
    description: "Manda uma sugestão para o bot",
    cooldown: 5000,
    aliases: ["sg"],
}
