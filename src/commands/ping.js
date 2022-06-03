exports.run = (client, args, channel, tags, message) => {
    function format(time) {
        let days = Math.floor(time / 86400)
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor(time / 60)

        let d = ('0' + days).slice(-2)
        let h = ('0' + hours).slice(-2)
        let m = ('0' + minutes).slice(-2)
        let s = ('0' + time).slice(-2)
        if(d === "00") {
            return `${h}h ${m}m ${s}s`
        } else {
            return `${d}d ${h}h ${m}m ${s}s`
        }
    }

    let uptime = Math.floor(process.uptime())
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const memoria = Math.round(used * 100) / 100

    client.ping().then(function(data) {
        let ping = Math.floor(Math.round(data * 1000))
        client.say(channel, `@${tags.username} PONG! Ping: ${ping}ms | Uptime: ${format(uptime)} | Memória: ${memoria}MB/512MBs`)
    })
}
module.exports.config = {
    name: 'ping',
    description: "Pinga o TMI e fala o uptime e o tanto de ram utilizada",
    aliases: ["pong"]
}