const { ChatClient } = require("@kararty/dank-twitch-irc")
const db = require("./db.js")
const log = require("../log")
const config = require("../../config")
const utils = require("../utils")

const client = module.exports = new ChatClient({
    username: config.botName,
    password: config.tmiToken
})

const joinChannels = async () => {
    let channels = []
    const channelsTable = await db("users")

    channelsTable.map((c) => c.twitch_name)
        .forEach(async (channel) => channels.push(channel))
    client.joinAll(channels)
        .catch((err) => {
            log.warn(`Couldn't connect to channel: ${err}`)
        })    
    log.info(`Connected to ${channels.length} channels`)    
}

client._ping = async () => {
    let asd = Date.now()
    await client.ping()
    return `${Date.now() - asd}ms`
}

client.connect()
    .catch((err) => {
        log.critical(`Couldn't connect to TMI: ${err}`)
    })
    .then(() => {
        joinChannels()
    })

client.on("ready", async () => {
    client.privmsg(config.mainChannel, `pajaDespair reconnected (${await client._ping()})`)
    log.info(`Bot connected to TMI (${await client._ping()})`)
})

module.exports = client
