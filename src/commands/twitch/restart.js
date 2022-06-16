exports.run = async (client, args, channel, tags, message, user) => {
    await client.say(channel, 'ppCircle reinciando')
    process.exit()
}
module.exports.config = {
    name: "restart",
    description: "Reincia o bot",
    aliases: ["rs"],
    adminOnly: true,
}
