exports.run = (client, args, channel, tags, message) => {
    if(!args[0]) {
        client.say(channel, "Algo deu errado! pajaDank")
        return
    }
    const calc = args.join(" ")
    client.say(channel, `${eval(calc)}`)
}

module.exports.config = {
    name: "math",
    description: "Realiza operações matematicas",
    cooldown: 5000,
    aliases: ["calculadora", "calc"],
}
