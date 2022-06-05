const { StaticAuthProvider } = require('@twurple/auth');
const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';
const accessToken = 'memcby3octmjgvtobot6x68ppvp242';
const authProvider = new StaticAuthProvider(clientId, accessToken)
const { ApiClient } = require('@twurple/api')
const api = new ApiClient({ authProvider })
module.exports = api