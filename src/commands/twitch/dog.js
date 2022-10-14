const axios = require("axios")
const FormData = require("form-data")

exports.run = async (client, args, channel, tags, message, user) => {
    async function fetchImage(url, image_path) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

    async function upload(file) {
        var formData = new FormData()
        formData.append("image", file, "dog_incidentbot.jpg")
        const response = await axios.post("https://i.lobis.co/upload", formData, {
            headers: {
                "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                auth: process.env.IMAGE_SERVICE_PASSWORD
            },
        })
        return await response.data
    }

    const imageTarget = await fetchImage("https://source.unsplash.com/random/?dog")
    const image = await upload(imageTarget)
    let say = {
        pt: `pajaH ${image}`,
        en: `pajaH ${image}`,
    }
    return say
}



module.exports.config = {
    name: "dog",
    description: "Manda a foto de um cachorro aleatório",
    aliases: ["randomdog", "rdog"],
    cooldown: 6000
}
