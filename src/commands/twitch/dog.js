const axios = require("axios")
const FormData = require("form-data")

exports.run = async (client, args, channel, tags, message, user) => {
    async function fetchImage(url) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

    async function upload (file) {
        var formData = new FormData()
        formData.append("image", file, "dog_incidentbot.jpg")
        await axios
            .post("https://i.lobis.co/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                    auth: process.env.IMAGE_SERVICE_PASSWORD

                },
            })
            .then( async (response) => {
                await client.say(channel, `pajaH @${tags.username}, ${response.data}`)
            })
            .catch(async (error) => {
                await client.say(channel, `FeelsBadMan @${tags.username}, ocorreu um erro...`)
                console.log(error)
            })
    }

    const imageTarget = await fetchImage("https://source.unsplash.com/random/?dog")
    await upload(imageTarget)
}



module.exports.config = {
    name: "dog",
    description: "Manda a foto de um cachorro aleatório",
    aliases: ["randomdog", "rdog"],
    cooldown: 6000
}
