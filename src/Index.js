require('dotenv').config({path: './.env'})
// require('.././.env')
const C = require('./channels.json');
const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'IncidentBot',
		password: process.env.TMI_TOKEN
	},
	channels: C.channels
});

module.exports = client
require('./handlers/tmi'); // twitch handler
require('./handlers/7tv.js') // 7tv
require('./handlers/discord') // discord handler
require('./services/discord.js')

client.on("connected", (adress, port) => {
    client.ping().then(function(data){
        let ping = Math.floor(Math.round(data*1000))
        // client.say("bytter_", `TrollDespair fui reinciado (${ping}ms)`)
		console.log("Conectado " + ping)
		
    })
})
 
