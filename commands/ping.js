exports.run = (client, args, channel, tags, message) => {
    function format(time){
        let day = time / 86400
        let hours = time / 3600
        let minutes = Math.floor(time / 60)
        
        console.log(day, hours, minutes)
        switch(time) {
            case time >= 60 || time <= 3600:
                return minutes
                break;
            default:
                console.log("xddddd")
        }

    
    }

    var uptime = Math.floor(process.uptime())
    console.log(uptime)
    format(uptime)
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    const memoria = Math.round(used * 100) / 100

    client.ping().then(function(data) {
        let ping = Math.floor(Math.round(data * 1000))
        
        // client.say(channel, `@${tags.username} PONG! Ping: ${ping}ms | Uptime: ${format(uptime)} | Memória: ${memoria}MB/512MBs`)
    })
}
module.exports.config = {
    name: 'ping',
    description: "Pinga o TMI e fala o uptime e o tanto de ram utilizada",
    aliases: ["pong"]
}
