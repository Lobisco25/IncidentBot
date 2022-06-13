const { Client, Intents } = require("discord.js")
const discClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

module.exports = discClient

discClient.once("ready", () => {
    console.log("Ready!")
})

discClient.login(process.env.DISCORD_TOKEN).catch((err) => {
    console.error("Não foi possível criar client do discord:", err.message)
})
