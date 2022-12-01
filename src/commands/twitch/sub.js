const prettyMilliseconds = require("pretty-ms")
const axios = require("axios")
exports.run = async (client, msg, args, cmd) => {

    const user = (() => {
        if (!args[0] || !args[1]) return msg.senderUsername
        else return args[0]
    })()

    const channel = (() => {
        if (!args[0]) return msg.channelName
        if (!args[1]) return args[0]
        else return args[1]
    })()

    const res = await axios.get(`https://api.ivr.fi/v2/twitch/subage/${user}/${channel}`)

    console.log(`${channel} - ${user}`)

    if (res.data.statusCode === 400) {
        let say = {
            pt: "Este canal não existe FeelsDankMan",
            en: "This channel does not exist FeelsDankMan"
        }
        return say
    }

    if (res.data.streak === null) {
        const mesesPt = res.data.cumulative ? `${res.data.cumulative.months > 1 ? `${res.data.cumulative.months} meses` : `${res.data.cumulative.months} mês`}` : "nenhum mês"
        const mesesEn = res.data.cumulative ? `${res.data.cumulative.months > 1 ? `${res.data.cumulative.months} months` : `${res.data.cumulative.months} month`}` : "0 months"
        let say = {
            pt: `Você não tem um sub em ${channel.toLowerCase()}, possuindo ${mesesPt} no total`,
            en: `You don't have a sub in ${channel.toLowerCase()}, with ${mesesEn} in total`
        }
        return say


    }

    else {
        const endSub = (() => {
            const end = new Date(res.data.streak.end)
            const now = new Date()
            const diff = end.getTime() - now.getTime()

            return prettyMilliseconds(diff)


        })
        const gifter = res.data.meta.giftMeta ? `(gifter: ${res.data.meta.giftMeta.gifter.displayName})` : ""

        let say = {
            pt: `Você tem um sub em ${channel.toLowerCase()} há ${res.data.cumulative.months} meses (streak: ${res.data.streak.months}) | Sub termina em ${endSub()} | Tipo: ${res.data.meta.type} tier ${res.data.meta.tier} ${gifter}`,
            en: `You have a sub in ${channel.toLowerCase()} for ${res.data.cumulative.months} months (streak: ${res.data.streak.months}) | Sub ends in ${endSub()} | Type: ${res.data.meta.type} tier ${res.data.meta.tier}  ${gifter}`
        }
        return say


    }


}
module.exports.config = {
    name: 'sub',
    description: 'Retorna as informações de sub de certo canal',
    aliases: ['subage', "subcheck", "sa"]
}