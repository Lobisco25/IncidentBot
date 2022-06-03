const { StaticAuthProvider } = require('@twurple/auth');
const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';
const accessToken = 'lvqvlkyvql0042sc2nku5psta6sjxf';
const authProvider = new StaticAuthProvider(clientId, accessToken);
const { ApiClient } = require('@twurple/api')
const api = new ApiClient({ authProvider })
module.exports = api