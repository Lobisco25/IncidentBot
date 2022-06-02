require('dotenv').config
const a = require('./channels.json');
const tmi = require('tmi.js');
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'IncidentBot',
		password: 'oauth:pfnbaclj55jbv3mk5e46dydxnw7h05'
	},
	channels: a.channels
});

module.exports = client
require('./handler.js');
client.connect();

client.on("connected", (adress, port) => {
    client.ping().then(function(data){
        let ping = Math.floor(Math.round(data*1000))
        client.say("bytter_", `TrollDespair fui reinciado (${ping}ms)`)
    })
})
