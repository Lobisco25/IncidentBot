const { Client, Intents } = require("discord.js")
const log = require("../handlers/logger")
const discClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

module.exports = discClient

discClient.once("ready", () => {
    log.debug("Discord ready")
})

discClient.login(process.env.DISCORD_TOKEN).catch((err) => {
    log.error("Não foi possível criar client do discord:", err.message)
})
