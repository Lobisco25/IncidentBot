const twurple = require("../../services/twurple")
exports.run = async (client, args, channel, tags, message, user) => {
    const search = await twurple.streams.getStreamByUserName(args[0])
    if(!search) return
    await client.say(
        channel,
        `@${tags.username}, preview de ${args[0]}: ${search.getThumbnailUrl(1280, 720)}`
    )
}
module.exports.config = {
    name: "preview",
    description: "",
    aliases: ["thumbnail"],
}
