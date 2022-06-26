const UserModel = require("../models/User")
exports.run = async (client, args, channel, tags, message, user) => {
    if(!args[0] || !args[1]) {
        await client.say(channel, "remind inválido tente remind nome mensagem")
        return
    }  
    const query = {
        remind: {
            message: args.slice(1).join(" ").toString(),
            from: tags["username"],
        },
    }
    await UserModel.findOneAndUpdate({ twitch_name: args[0] }, query,  {
        upsert: false,
        new: true,
        setDefaultsOnInsert: true,
    })
       
    await client.say(
        channel,
        `${tags.username}, o remind foi salvo para ${args[0]} 🔔`
    )
}
module.exports.config = {
    name: "remind",
    description: "Salva um remind para alguem ou para você mesmo.",
    cooldown: 5000,
    aliases: [], // remindme
}