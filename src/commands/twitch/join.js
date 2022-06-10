exports.run = (client, args, channel, tags, message) => {
    if (!["bytter_", "lobisco25", "feridinha"].includes(tags.username)) return
    console.log("asd")
    const fs = require("fs")
    const channelTarget = args[0].toLowerCase()
    var oldData = JSON.parse(fs.readFileSync(__dirname + "/../../channels.json"))
    oldData.channels.push(channelTarget)
    console.log(oldData)
    fs.writeFileSync(__dirname + "/../../channels.json", JSON.stringify(oldData, null, 2))
    client.join(channelTarget)
    client.say(channel, `Conectado com sucesso em ${args[0]} FeelsOkayMan`)
}

module.exports.config = {
    name: "join",
    description: "Join channels",
    cooldown: 5000,
    aliases: [],
}
