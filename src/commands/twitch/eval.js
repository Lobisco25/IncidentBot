exports.run = async (client, args, channel, tags, message, user) => {
    if (!(tags.username == "bytter_" ||tags.username == "lobisco25" ||tags.username == "feridinha")) return
    
    try {
        const evaled = eval(args.join(" "))
        await client.say(channel, evaled.toString())
    } catch (err) {
        await client.say(channel, "Erro: " + err.message)
    }
}
module.exports.config = {
    name: "eval",
    description: "Roda um comando JavaScript",
    aliases: ["js"],
}
