const axios = require("axios")
const FormData = require("form-data")

async function fetchImage(url) {
    const result = await axios({ url, responseType: "stream", })
    return result.data
}

exports.run = async (client, msg, args, cmd) => {
    async function fetchImage(url, image_path) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

    async function upload(file) {
        var formData = new FormData()
        formData.append("image", file, "dne_incidentbot.jpg")
        const response = await axios.post("https://i.lobis.co/upload", formData, {
            headers: {
                "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                auth: process.env.IMAGE_SERVICE_PASSWORD
            },
        })
        return await response.data
    }
    var imageTarget = null

    switch (args[0]) {
        default:
            imageTarget = await fetchImage("https://thispersondoesnotexist.com/image")
            break
        case "cat":
            imageTarget = await fetchImage("http://thiscatdoesnotexist.com")
            break
    }

    const image = await upload(imageTarget)
    let say = {
        pt: `pajaH ${image}`,
        en: `pajaH ${image}`,
    }
    return say
}
module.exports.config = {
    name: "doesnotexist",
    description: "command",
    aliases: ["dne"],
    cooldown: 5000
}
