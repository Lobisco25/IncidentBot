require("dotenv").config()
require("./handlers/tmi") // twitch handler
require("./handlers/7tv.js").initialize() // initialize 7tv events
require("./handlers/discord") // discord handler
require("./services/discord.js")
require("./handlers/afk.js")
const axios = require("axios")
const client = require("./services/tmi")

    if(Boolean(process.env.IS_PROD)) {
        setInterval(() => {
            axios.get(
                `${process.env.UPTIME_ENDPOINT}${process.env.BOT_UPTIME}?status=up&msg=All%20Up`
            )
        }, 60 * 1000)
    }


