exports.run = (client, args, channel, tags, message) => {
    const input = args.join(" ")
    const result = eval(input.replace(/[^0-9\+\-\*\/]/g, ""))

    if (!args[0] || result === undefined) {
        client.say(channel, "Algo deu errado! pajaDank")
        return
    }

    client.say(channel, `${tags.username}, ${result}`)
}

module.exports.config = {
    name: "math",
    description: "Realiza operações matematicas",
    cooldown: 5000,
    aliases: ["calculadora", "calc"],
}
