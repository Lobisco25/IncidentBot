require("dotenv").config()
// services
require("./services/tmi")
require("./services/discord.js")
// handlers
require("./handlers/tmi") // twitch handler
require("./handlers/7tv.js").initialize() // initialize 7tv events
require("./handlers/afk.js")
require("./handlers/api")
const axios = require("axios")

    if(Boolean(process.env.IS_PROD)) {
        console.log("olaaaaaaaaa")
        setInterval(() => {
            axios.get(
                `${process.env.UPTIME_ENDPOINT}${process.env.BOT_UPTIME}?status=up&msg=All%20Up`
            )
        }, 60 * 1000)
    }


