const UserModel = require("../../models/User.js")
const log = require("../../handlers/logger")

// https://stackoverflow.com/a/54067343
exports.run = async (client, args, channel, tags, message, user) => {
    if (!args.length) return
    await UserModel.findOneAndUpdate(
        { twitch_id: tags["user-id"] },
        {
            twitch_name: tags["username"],
            city: args.join(" "),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
        .then(async () => {
            await client.say(
                channel,
                `${tags.username}, Salvei sua cidade FeelsOkayMan 👍`
            )
        })
        .catch(async (err) => {
            log.error(`Erro ao salvar cidade de usuário: `, err)
            await client.say(
                channel,
                `${tags.username}, Ocorreu um erro ao salvar sua cidade FeelsBadMan ☂`
            )
        })
}

module.exports.config = {
    name: "savecity",
    description: "Salva asua cidade para ser usada no comando weather",
    aliases: ["city"],
    cooldown: 3000,
}
