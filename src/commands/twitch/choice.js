exports.run = async (client, msg, args, cmd)  => {
    if (!args[0] || args[0] === "ou" || !args[2]) {
        let say = {
            pt: "pajaL isso é um comando de escolha aleatória, mande duas ou mais escolhas separadas por ou e o bot vai escolher uma delas para você!",
            en: "pajaL this is a random choice command, send two or more choices separated by 'ou' and the bot will choose one of them for you!"
        }
        return say
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

    let say = {
        pt: args[random],
        en: args[random]
    }

    return say
}

module.exports.config = {
    name: "choice",
    description: "Escolhe alguma coisa",
    aliases: ["escolha"],
    cooldown: 5000,
}
