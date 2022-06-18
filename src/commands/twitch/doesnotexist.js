const axios = require("axios")
const FormData = require("form-data")

async function fetchImage(url) {
    const result = await axios({ url, responseType: "stream", })
    return result.data
}

exports.run = async (client, args, channel, tags, message, user) => {
    async function upload(file) {
        var formData = new FormData()
        formData.append("file", file, "doesnotexist_incidentbot.jpg")
        await axios
            .post("https://feridinha.com/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                },
            })
            .then(async (response) => {
                await client.say(
                    channel,
                    `pajaH @${tags.username}, ${response.data.message}`
                )
            })
            .catch(async (error) => {
                await client.say(
                    channel,
                    `FeelsBadMan @${tags.username}, ocorreu um erro...`
                )
                console.log(error)
            })
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

    if(!imageTarget) return

    await upload(imageTarget) 
}
module.exports.config = {
    name: "doesnotexist",
    description: "command",
    aliases: ["dne"],
    cooldown: 5000
}
