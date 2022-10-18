const axios = require("axios")
const FormData = require("form-data")

exports.run = async (client, msg, args, cmd) => {
    async function fetchImage(url, image_path) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

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

    const imageTarget = await fetchImage("https://cataas.com/cat")
    const image = await upload(imageTarget)
    let say = {
        pt: `pajaH ${image}`,
        en: `pajaH ${image}`,
    }
    return say
}
module.exports.config = {
    name: "cat",
    description: "Manda a foto de um gato aleatório",
    aliases: ["cataas", "randomcat", "rcat"],
    cooldown: 6000
}
