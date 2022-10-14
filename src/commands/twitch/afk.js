const UserModel = require("../../models/User")
async function setAFKStatus(message, tags, type) {
    const query = {
        afk: {
            message: message,
            time: new Date(),
            _type: type,
        },
    }

    await UserModel.findOneAndUpdate({ twitch_id: tags["user-id"] }, query, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
    })
}

exports.run = async (client, args, channel, tags, message, user) => {
    const msg = args[0] === undefined ? "(Sem mensagem)" : `${args.join(" ")}`
     
    await setAFKStatus(msg, tags, tags.source)
    var output = null
    const afkType = (type) => {
        const emojis = {
            afk: "🏃 💨",
            brb: "⌛",
            gn: "💤",
            work: "💼",
            study: "📚",
            workout: "🏋🏻",
            read: "📖",
            food: "OpieOP",
            fuck: "🤨",
            shower: "😏🚿"
        }
        const msg = args[0] === undefined ? emojis[type] : `${args.join(" ")} ${emojis[type]}`
        const source = {
            afk: {
                pt: `agora está AFK: ${msg}`,
                en: `is now AFK: ${msg}`
            },
            brb: {
                pt: `volta já: ${msg}`,
                en: `will be right back: ${msg}`
            },
            gn: {
                pt: `foi dormir: ${msg}`,
                en: `is now sleeping ${msg}`
            },
            work: {
                pt: `foi trabalhar: ${msg}`,
                en: `is working`
            },
            study: {
                pt: `foi estudar: ${msg}`,
                en: `is now studying ${msg}`
            },
            workout: {
                pt: `foi treinar: ${msg}`,
                en: `is now working out: ${msg}`
            },
            read: {
                pt: `foi ler: ${msg}`,
                en: `went to read: ${msg}`
            },
            food: {
                pt: `foi comer: ${msg}`,
                en: `is now eating: ${msg}`
            },
            fuck: {
                pt: `foi foder: ${msg}`,
                en: `is now fucking: ${msg}`
            },
            shower: {
                pt: `foi tomar banho: ${msg}`,
                en: `is now taking a shower: ${msg}`
            },
        }
        output = source[type]
        return output
    }

    afkType(tags.source)
    let say = {
        pt: output.pt,
        en: output.en
    }
    return say
}

module.exports.config = {
    name: "afk",
    description:
        "Avisa ao chat que você vai ficar longe ou algo desse tipo eu n sei como as pessoa realmente usam o afk",
    aliases: ["gn","study","code","workout","shower","brb","work","read","food","fuck"],
    cooldown: 2000,
}