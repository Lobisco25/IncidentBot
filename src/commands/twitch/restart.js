const { exec } = require("child_process");

exports.run = async (client, args, channel, tags, message, user) => {
    await client.say(channel, "RareParrot rodando git pull e npm i | ApuApustaja TeaTime reinciando")
    await exec("git pull")
    await exec("npm i")
    await process.exit()
}
module.exports.config = {
    name: "restart",
    description: "Reincia o bot",
    aliases: ["rs"],
    adminOnly: true,
}
