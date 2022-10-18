const { exec } = require("child_process");

exports.run = async (client, msg, args, cmd) => {
    await client.privmsg(msg.channelName, "Restarting ApuApustaja TeaTime (git pull -> pnpm i)")
    await exec("git pull")
    await exec("pnpm i")
    await process.exit()
}
module.exports.config = {
    name: "restart",
    description: "Reincia o bot",
    aliases: ["rs"],
    adminOnly: true,
}
