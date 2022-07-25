const { exec } = require("child_process");

exports.run = async (client, args, channel, tags, message, user) => {
    await client.say(channel, "RareParrot rodando git pull")
    await exec("git pull")
    await client.say(channel, 'ApuApustaja TeaTime reinciando')
    await process.exit()
}
module.exports.config = {
    name: "restart",
    description: "Reincia o bot",
    aliases: ["rs"],
    adminOnly: true,
}
