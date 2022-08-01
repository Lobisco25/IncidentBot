const howLongToBeat = require('howlongtobeat');
const hltb = new howLongToBeat.HowLongToBeatService();

exports.run = async (client, args, channel, tags, message, user) => {
    if (!args[0]) {
        return client.say(channel, "pajaM Você precisa mencionar um jogo")
    }

    const res = await hltb.search(args.join(" "))

    if (res[0] == undefined) {
        return client.say(channel, "pajaM Não achei esse jogo, tente ser mais especifico")
    }

    const emote = (res[0].gameplayMain > 90)
        ? "pajaWTF"
        : "pajaL"

    await client.say(channel, `${emote} ${tags.username}, Jogo: ${res[0].name} | Gameplay Principal: ${res[0].gameplayMain}h | Gameplay com Extras: ${res[0].gameplayMainExtra}h | Tempo Para Platinar: ${res[0].gameplayCompletionist}h`)
}
module.exports.config = {
    name: 'hltb',
    description: 'command',
    aliases: ['howlongtobeat']
}