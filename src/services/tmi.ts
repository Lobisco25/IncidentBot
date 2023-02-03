import { ChatClient } from "@kararty/dank-twitch-irc"
import db from "./db"
import log from "../log"
import config from "../../config"
import reconnectPhrases from "../data/reconnectphrases.json"
import utils from "../utils"

const client = new ChatClient({
    username: config.botName,
    password: config.tmiToken
})

const joinChannels = async () => {
    let channels = []
    const channelsTable = await db("channels")

    channelsTable.map((c) => c.twitch_name)
        .forEach(async (channel) => channels.push(channel))
    client.joinAll(channels)
        .catch((err) => {
            log.warn(`Couldn't connect to channel: ${err}`)
        })    
    log.info(`Connected to ${channels.length} channels`)    
}

const ping = async () => {
    let asd = Date.now()
    await client.ping()
    return `${Date.now() - asd}ms`
}

const reconnected = reconnectPhrases[utils.random(reconnectPhrases.length)]

client.connect()
    .catch((err) => {
        log.critical(`Couldn't connect to TMI: ${err}`)
    })
    .then(() => {
        joinChannels()
    })
client.on("ready", async () => {
    client.privmsg(config.mainChannel, `${config.restartEmote} ${reconnected} (${await ping()})`)
    log.info(`Bot connected to TMI (${await ping()})`)
})

export default client