exports.run = (discord, args, message) => {
    const format = (time) => {
        let days = Math.floor(time / 86400)
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)
        
        return `${('0' + days).slice(-2)}:${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + time).slice(-2)}`
    }

        message.reply("pinging...").then((msg) => {
        const ping = msg.createdTimestamp - message.createdTimestamp
        const uptime = Math.floor(process.uptime())

        msg.edit(`${ping}ms, uptime: ${format(uptime)}`)
    })
}

module.exports.config = {
    name: "ping",
    description: "",
    aliases: []
}