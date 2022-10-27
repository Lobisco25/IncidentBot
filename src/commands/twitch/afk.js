const UserModel = require("../../models/User")
async function setAFKStatus(message, msg, type) {
    const query = {
        afk: {
            message: message,
            time: new Date(),
            _type: type,
        },
    }

    await UserModel.findOneAndUpdate({ twitch_id: msg.senderUserID }, query, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
    })
}

exports.run = async (client, msg, args, cmd) => {
    console.log(msg.senderUserID)
    var output = null
    const afkType = async (type) => {
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
            shower: "😏🚿",
            poop: "🚽"
        }
        const message = args[0] === undefined ? emojis[type] : `${args.join(" ")} ${emojis[type]}`
        await setAFKStatus(message, msg, cmd)
        const source = {
            afk: {
                pt: `agora está AFK: ${message}`,
                en: `is now AFK: ${message}`
            },
            brb: {
                pt: `volta já: ${message}`,
                en: `will be right back: ${message}`
            },
            gn: {
                pt: `foi dormir: ${message}`,
                en: `is now sleeping: ${message}`
            },
            work: {
                pt: `foi trabalhar: ${message}`,
                en: `is working: ${message}`
            },
            study: {
                pt: `foi estudar: ${message}`,
                en: `is now studying: ${message}`
            },
            workout: {
                pt: `foi treinar: ${message}`,
                en: `is now working out: ${message}`
            },
            read: {
                pt: `foi ler: ${message}`,
                en: `went to read: ${message}`
            },
            food: {
                pt: `foi comer: ${message}`,
                en: `is now eating: ${message}`
            },
            fuck: {
                pt: `foi foder: ${message}`,
                en: `is now fucking: ${message}`
            },
            shower: {
                pt: `foi tomar banho: ${message}`,
                en: `is now taking a shower: ${message}`
            },
            poop: {
                pt: `foi dar um cagão: ${message}`,
                en: `is now shitting himself: ${message}`
            }
        }
        output = source[type]
        return output
    }


    output = await afkType(cmd)
    let say = {
        pt: output.pt,
        en: output.en
    }
    return say
}

module.exports.config = {
    name: "afk",
    description: "Avise ao chat que você ira sair, e cronometre o seu tempo de AFK",
    aliases: ["gn", "study", "code", "workout", "shower", "brb", "work", "read", "food", "fuck", "poop"],
    cooldown: 2000,
}