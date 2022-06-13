require('dotenv').config()
require('./handlers/tmi'); // twitch handler
require('./handlers/7tv.js').initialize() // initialize 7tv events
require('./handlers/discord') // discord handler
require('./services/discord.js')
