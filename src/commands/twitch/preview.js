const twurple = require("../../services/twurple")
const axios = require("axios")
const FormData = require("form-data")
exports.run = async (client, args, channel, tags, message, user) => {
    const search = await twurple.streams.getStreamByUserName(args[0])
    if(!search) return
    async function fetchImage(url, image_path) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

    async function upload (file) {
        var formData = new FormData()
        formData.append("image", file, "preview_incidentbot.jpg")
        await axios
            .post("https://i.lobis.co/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                    auth: process.env.IMAGE_SERVICE_PASSWORD
                },
            })
            .then(async (response) => {
                await client.say(channel, `@${tags.username} ${response.data}`)
            })
            .catch(async (error) => {
                await client.say(channel, `FeelsBadMan @${tags.username}, ocorreu um erro...`)
                console.log(error)
            })
    }
    
    const imageTarget = await fetchImage(search.getThumbnailUrl(1280, 720))
    await upload(imageTarget)
}

    
module.exports.config = {
    name: "preview",
    description: "",
    aliases: ["thumbnail"],
}
