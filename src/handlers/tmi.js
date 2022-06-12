const fs = require("fs")
const client = require("../services/tmi")
const prefix = "-"

client.commands = new Map()
client.aliases = new Map()
client.cooldown = new Map()

fs.readdir(__dirname + "/../commands/twitch", (err, files) => {
    if (err) console.log(err)

    const jsfile = files.filter((f) => f.split(".").pop() == "js")
    if (!jsfile) {
        console.log("Não foram encontrados comandos!")
    }

    jsfile.forEach((f, i) => {
        let pull = require(`../commands/twitch/${f}`)
        pull["cooldown_users"] = []
        client.commands.set(pull.config.name, pull)
        client.cooldown.set(0, pull.config.cooldown)
        pull.config.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.config.name)
        })
    })
})

function setUserCooldown(cmdF, tags) {
    // Adiciona o usuário atual para a array de cooldowns
    cmdF.cooldown_users.push(tags["user-id"])
    // let cooldown = client.commands.get(client.cooldowns.get(cmd))
    let cooldown = client.cooldown.get(0)
    // Tira o usuário da array de cooldowns depois de 5 segundos
    setTimeout(() => {
        cmdF.cooldown_users = cmdF.cooldown_users.filter((i) => {
            i !== tags["user-id"]
        })
    }, cooldown)
}

client.on("message", async (channel, tags, message, self) => {
    if (self) return
    let args = message.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    let cmdF =
        client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))

    if (!message.startsWith(prefix)) return

    if (cmdF.cooldown_users.includes(tags["user-id"])) {
        console.log("Cooldown ativo para esse usuário, ignorando")
        return
    }
    setUserCooldown(cmdF, tags)

    if (cmdF) {
        try {
            cmdF.run(client, args, channel, tags, message)
        } catch (err) {}
    }
})
