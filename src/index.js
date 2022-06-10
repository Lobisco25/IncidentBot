require('dotenv').config()
require('./handlers/tmi'); // twitch handler
require('./handlers/7tv.js') // 7tv
require('./handlers/discord') // discord handler
require('./services/discord.js')
