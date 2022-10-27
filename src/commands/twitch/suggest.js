const SuggestModel = require("../../models/Suggest.js")
const { MessageEmbed } = require("discord.js")
const discordClient = require("../../services/discord")
const log = require("../../handlers/logger")

exports.run = async (client, msg, args, cmd) => {
    if (!args[0]) {
        let say = {
            pt: "Mande uma sugestão para os devs do IncidentBot pajaH",
            en: "Send a suggestion to IncidentBot's devs pajaH"
        }
        return say
    }
    await SuggestModel.create(
        {
            author_name: tags.username,
            message: args.join(" "),
        },
        ((err, i) => {
            if (err) {
                log.error("Erro ao criar uma sugestão", err)
                let say = {
                    pt: "Erro ao salvar a sugestão pajaDent tente denovo...",
                    en: "Error saving suggestion pajaDent try again..."
                }
                return say
            }

            const embed = new MessageEmbed()
                .setColor("#fc1303")
                .setTitle(`${i.author_name}`)
                .setDescription(`sugestão: ${i.message}`)

            discordClient.channels.cache
                .get("983065628984369244")
                .send({ embeds: [embed] })
        })
    )
    let say = {
        pt: "Sua sugestão foi salva com sucesso pajaDank 👍🏼",
        en: "Your suggestion was saved sucessfully pajaDank 👍🏼"

    }
    return say
}

module.exports.config = {
    name: "suggest",
    description: "Manda uma sugestão para os devs do bot",
    aliases: ["sg"],
    cooldown: 5000,
}
