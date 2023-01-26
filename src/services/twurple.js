const { StaticAuthProvider } = require('@twurple/auth');
const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.TWITCH_ACESS_TOKEN
const authProvider = new StaticAuthProvider(clientId, accessToken)
const { ApiClient } = require('@twurple/api')
const api = new ApiClient({ authProvider })
module.exports = api