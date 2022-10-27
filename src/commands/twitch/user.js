const twurple = require("../../services/twurple.js")
const axios = require("axios")
const FormData = require("form-data")


const getUserDate = (search) => {
    creationDate = `${search.creationDate.getUTCDate()}/${search.creationDate.getUTCMonth() + 1
        }/${search.creationDate.getUTCFullYear()} as ${search.creationDate.getHours()}:${search.creationDate.getMinutes()}:${search.creationDate.getSeconds()}`
    return creationDate
}
async function fetchImage(url, image_path) {
    const result = await axios({ url, responseType: "stream", })
    return result.data
}


exports.run = async (client, msg, args, cmd) => {
    if (!args[0]) return

    const search = isNaN(args[0])
        ? await twurple.users.getUserByName(args[0])
        : await twurple.users.getUserById(args[0])

    if (!search) return 

    const creationDate = getUserDate(search)


    async function upload(file) {
        var formData = new FormData()
        formData.append("image", file, "cat_incidentbot.jpg")
        const response = await axios.post("https://i.lobis.co/upload", formData, {
            headers: {
                "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                auth: process.env.IMAGE_SERVICE_PASSWORD
            },
        })
        return await response.data
    }

    const imageTarget = await fetchImage(search.profilePictureUrl)
    const image = await upload(imageTarget)
    let say = {
        pt: `pajaDank @${search.displayName} (${search.id}) | Criado em: ${creationDate} | Bio: ${search.description} | Foto de perfil: ${image}`,
        en: `pajaDank @${search.displayName} (${search.id}) | Created at: ${creationDate} | Bio: ${search.description} | Profile picture ${image}`,
    }
    return say
    


}
module.exports.config = {
    name: "user",
    description: "Retorna as informações do usuário especificado na Twitch",
    aliases: ["uid", "cli"],
    cooldown: 2000
}
