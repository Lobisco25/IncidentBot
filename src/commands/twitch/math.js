const math = require('mathjs')
exports.run = (client, args, channel, tags, message) => {
    const input = args.join(" ")
    const result = math.evaluate(input)

    if (!args[0]) {
        client.say(channel, "Algo deu errado! pajaDank")
        return
    }

    client.say(channel, `${tags.username}, ${result}`)
}

module.exports.config = {
    name: "math",
    description: "Realiza operações matematicas",
    aliases: ["calculadora", "calc"],
    cooldown: 5000,
}
