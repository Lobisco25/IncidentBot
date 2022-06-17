const axios = require("axios")
const FormData = require("form-data")

exports.run = async (client, args, channel, tags, message, user) => {
    async function fetchImage(url, image_path) {
        const result = await axios({ url, responseType: "stream", })
        return result.data
    }

    async function upload (file) {
        var formData = new FormData()
        formData.append("file", file, "cat_incidentbot.jpg")
        await axios
            .post("https://feridinha.com/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
                },
            })
            .then( async (response) => {
                await client.say(channel, `@${tags.username}, ${response.data.message}`)
            })
            .catch(async (error) => {
                await client.say(channel, `@${tags.username}, ocorreu um erro...`)
                console.log(error)
            })
    }

    const imageTarget = await fetchImage("https://cataas.com/cat")
    await upload(imageTarget)
}



module.exports.config = {
    name: "cat",
    description: "Manda a foto de um gato aleatório",
    aliases: ["cataas", "randomcat", "rcat"],
    cooldown: 6000
}
