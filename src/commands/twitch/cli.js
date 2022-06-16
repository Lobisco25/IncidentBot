const twurple = require("../../services/twurple.js")

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0])
        return

    switch (isNaN(args[0])) {
        case (true):
            search = await twurple.users.getUserByName(args[0])
            creationDate = `${search.creationDate.getUTCDate()}/${search.creationDate.getUTCMonth() + 1}/${search.creationDate.getUTCFullYear()} as ${search.creationDate.getHours()}:${search.creationDate.getMinutes()}:${search.creationDate.getSeconds()}`
            client.say(
            channel,
            `@${search.displayName} | ${search.id} | Criado em: ${creationDate} | Bio: ${search.description} | Foto de Perfil: ${search.profilePictureUrl}`
            )
            break;
        case (false):
            search = await twurple.users.getUserById(args[0])
            creationDate = `${search.creationDate.getUTCDate()}/${search.creationDate.getUTCMonth() + 1}/${search.creationDate.getUTCFullYear()} as ${search.creationDate.getHours()}:${search.creationDate.getMinutes()}:${search.creationDate.getSeconds()}`
            client.say(
            channel,
            `@${search.displayName} | ${search.id} | Criado em: ${creationDate} | Bio: ${search.description} | Foto de Perfil: ${search.profilePictureUrl}`
            )
            break
        }

}
module.exports.config = {
    name: "cli",
    description: "Pega as informações de um usuário da Twitch.",
    aliases: ["user"],
}
