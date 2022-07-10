const fs = require("fs")
const discord = require("../services/discord")
const prefix = "-"

discord.commands = new Map()

fs.readdir("./src/commands/discord", (err, files) => {
    if (err) console.log(err)

    const jsFile = files.filter((f) => f.split(".").pop("js"))

    if (!jsFile) console.log("Não Foram encontrado comandos")

    jsFile.forEach((f, i) => {
        let pull = require(`../commands/discord/${f}`)
        discord.commands.set(pull.config.name, pull)
    })
})

discord.on("message", (message) => {
    if (message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmdFile = discord.commands.get(command)
    if (!message.content.startsWith(prefix)) return


    if (cmdFile) {
        try {
            cmdFile.run(discord, args, message)
        } catch (err) {
            if (err) console.log("Erroooooooooooooos: " + err)
            const pushId = process.env.DISCORD_UPTIME
            axios.get(`${process.env.UPTIME_ENDPOINT}/${pushId}?status=up&msg=${err}&ping=${ping}`)
        }
    }
})
