const howLongToBeat = require('howlongtobeat');
const hltb = new howLongToBeat.HowLongToBeatService();

exports.run = async (client, args, channel, tags, message, user) => {
    try {
    if (!args[0]) {
        let say = {
            pt: "pajaM Você precisar mencionar um jogo",
            en: "pajaM You need to provide a game"
        }
        return say
    }

    const res = await hltb.search(args.join(" "))
    const emote = (res[0].gameplayMain > 90)
        ? "pajaWTF"
        : "pajaL"

    if (res[0] == undefined) {
        let say = {
            pt: "pajaM Não achei esse jogo, tente ser mais especifico",
            en: "pajaM I couldn't find this game, try being more specific"
        }
        return say
    }
    else {
        let say = {
            pt: `${emote} ${tags.username}, Jogo: ${res[0].name} | Gameplay Principal: ${res[0].gameplayMain}h | Gameplay com Extras: ${res[0].gameplayMainExtra}h | Tempo Para Platinar: ${res[0].gameplayCompletionist}h`,
            en: `${emote} ${tags.username}, Game: ${res[0].name} | Main Gameplay: ${res[0].gameplayMain}h | Gameplay with Extras: ${res[0].gameplayMainExtra}h | Completionist: ${res[0].gameplayCompletionist}h`
        }
        
    return say

    }
} catch(err) {
    console.log(err)
}
        
}
module.exports.config = {
    name: 'hltb',
    description: 'command',
    aliases: ['howlongtobeat']
}