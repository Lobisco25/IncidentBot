exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0] || args[0] === "ou" || !args[2]) {
        client.say(
            channel,
            `FeelsBadMan Não deu para escolher tente "choice opção1 ou opção2"`
        )
        return
    }

    function count(arr, value) {
        let count = 1
        arr.forEach((e) => e === value && count++)

        return count
    }

    const choices = count(args, "ou")
    const random = Math.floor(Math.random() * choices)
    let index = args.indexOf("ou")

    while (index >= 0) {
        args.splice(index, 1)
        index = args.indexOf("ou")
    }

    client.say(channel, `${tags.username}, ${args[random]}`)
}

module.exports.config = {
    name: "choice",
    description: "Escolhe alguma coisa",
    aliases: ["escolha"],
    cooldown: 5000,
}
