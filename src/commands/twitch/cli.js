const twurple = require("../../services/twurple.js")

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0])
        return

    const search = await twurple.users.getUserById(args[0])
    client.say(
        channel,
        `@${search.displayName} | ${search.id} | Criado em: ${search.creationDate} | Bio: ${search.description} | Foto de Perfil: ${search.profilePictureUrl}`
    )
}
module.exports.config = {
    name: "cli",
    description: "",
    aliases: ["user"],
}
