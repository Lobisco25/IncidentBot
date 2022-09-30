const twurple = require("../../services/twurple.js")
const axios = require("axios")
const FormData = require("form-data")


const getUserDate = (search) => {
    creationDate = `${search.creationDate.getUTCDate()}/${
        search.creationDate.getUTCMonth() + 1
    }/${search.creationDate.getUTCFullYear()} as ${search.creationDate.getHours()}:${search.creationDate.getMinutes()}:${search.creationDate.getSeconds()}`
    return creationDate
}

async function fetchImage(url, image_path) {
    const result = await axios({ url, responseType: "stream", })
    return result.data
}

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) return

    const search = isNaN(args[0])
        ? await twurple.users.getUserByName(args[0])
        : await twurple.users.getUserById(args[0])

    if (!search) {
        return client.say(channel, "pajaM Não achei esse usuário")
    }

    const creationDate = getUserDate(search)

    
    async function upload (file) {
        var formData = new FormData()
        formData.append("image", file, "cli_twitch_profile_incidentbot.jpg")
        await axios
        .post("https://i.lobis.co/upload", formData, {
            headers: {
                "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                auth: process.env.IMAGE_SERVICE_PASSWORD
            },
        })
        .then(async (response) => {
            client.say(
                channel,
                `pajaDank @${search.displayName} | ${search.id} | Criado em: ${creationDate} | Bio: ${search.description} | Foto de Perfil: ${response.data}`
            )
            })
            .catch(async (error) => {
                await client.say(channel, `FeelsBadMan @${tags.username}, ocorreu um erro...`)
                console.log(error)
            })
    }

    const imageTarget = await fetchImage(search.profilePictureUrl)
    await upload(imageTarget)


}
module.exports.config = {
    name: "user",
    description: "Pega as informações de um usuário da Twitch.",
    aliases: ["uid"],
    cooldown: 2000
}
