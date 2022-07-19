exports.run = async (client, args, channel, tags, message, user) => {
    function countChoices(arr, value) {
        let count = 1
        arr.forEach((e) => (e === value && count++))
        return count
    }
    
    const choices = countChoices(args, "ou")
    const random = Math.floor(Math.random() * choices)
    console.log(args[random])
}

module.exports.config = {
    name: "choice",
    description: "Escolhe alguma coisa",
    aliases: ["escolha"],
    cooldown: 5000
}
