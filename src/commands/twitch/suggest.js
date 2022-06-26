const SuggestModel = require("../../models/Suggest.js")
const { MessageEmbed } = require("discord.js")
const discordClient = require("../../services/discord")
const log = require("../../handlers/logger")

exports.run = async (client, args, channel, tags, message, user) => {
    await SuggestModel.create(
        {
            author_name: tags.username,
            message: args.join(" "),
        },
        function (err, i) {
            if (err) log.error("Erro ao criar uma sugestão", err)
            client.say(channel, "pajaH A sua sugestão foi anotada!")

            const embed = new MessageEmbed()
                .setColor("#fc1303")
                .setTitle(`${i.author_name}`)
                .setDescription(`sugestão: ${i.message}`)

            discordClient.channels.cache
                .get("983065628984369244")
                .send({ embeds: [embed] })
        }
    )
}


module.exports.config = {
    name: "suggest",
    description: "Manda uma sugestão para o bot",
    cooldown: 5000,
    aliases: ["sg"],
}
