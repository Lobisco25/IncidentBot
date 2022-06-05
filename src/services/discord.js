const { Client, Intents } = require('discord.js');
require('dotenv').config({path: '.../.env'})
const discClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = discClient

discClient.once('ready', () => {
	console.log('Ready!');
});

discClient.login(process.env.DISCORD_TOKEN);