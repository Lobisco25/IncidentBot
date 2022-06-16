const twurple = require("../../services/twurple.js")

const getUserDate = (search) => {
    creationDate = `${search.creationDate.getUTCDate()}/${
        search.creationDate.getUTCMonth() + 1
    }/${search.creationDate.getUTCFullYear()} as ${search.creationDate.getHours()}:${search.creationDate.getMinutes()}:${search.creationDate.getSeconds()}`
    return creationDate
}

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) return

    const search = isNaN(args[0])
        ? await twurple.users.getUserByName(args[0])
        : await twurple.users.getUserById(args[0])

    if (!search) {
        return client.say(channel, "Não achei esse usuário")
    }

    const creationDate = getUserDate(search)

    client.say(
        channel,
        `@${search.displayName} | ${search.id} | Criado em: ${creationDate} | Bio: ${search.description} | Foto de Perfil: ${search.profilePictureUrl}`
    )
}
module.exports.config = {
    name: "cli",
    description: "Pega as informações de um usuário da Twitch.",
    aliases: ["user"],
}
