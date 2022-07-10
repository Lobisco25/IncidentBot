require('dotenv').config()
require('./handlers/tmi'); // twitch handler
require('./handlers/7tv.js').initialize() // initialize 7tv events
require('./handlers/discord') // discord handler
require('./services/discord.js')
require('./handlers/afk.js')
const axios = require("axios")

setInterval(function() {
    const pushId = process.env.BOT_UPTIME
    axios.get(`${process.env.UPTIME_ENDPOINT}/${pushId}?status=up&msg=${err}&ping=${ping}`)
}, 60 * 1000)
