exports.run = (client, args, channel, tags, message, user) => {
    const fs = require("fs")
    .readdir("./src/commands/twitch", (err, files) => {
        if (err) return
        const cmdNames = files
            .toString()
            .replace(/.js/g, "")
            .replace("eval,", "")
            .replace(/,/g, ", ")

        client.say(channel, `Os comandos são: ${cmdNames} :)`)
    })
}
module.exports.config = {
    name: "help",
    description: "Show all commands",
    aliases: ["commands"],
}
