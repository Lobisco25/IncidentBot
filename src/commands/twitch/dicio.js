exports.run = async (client, args, channel, tags, message, user) => {
    const axios = require("axios")
    const enRes = "This command is not available in non-portuguese chats."
try { 
    const res = await axios({
        method: "GET",
        url: `https://significado.herokuapp.com/${args[0]}`,
        ValidityStatus: () => true
    })   
        if (res.status == 400 || res.data[0].meanings[0] == undefined) {
            let say = {
                pt: `essa palavra não está no dicionário FeelsDankMan`,
                en: enRes
            }
            return say
        } else if (res.data[0].meanings[1] == undefined) {
            let say = {
                pt: `pajaM ${res.data[0].meanings[0]}`,
                en: enRes
            }
            return say
        } else {
            let say = {
                pt: `pajaM 1: ${res.data[0].meanings[0]} | 2: ${res.data[0].meanings[1]}`,
                en: enRes
            }
            return say
        }
} catch(err) {
    let say = {
        pt: "ocorreu um erro...",
        en: enRes
    }
    return say
}
}
module.exports.config = {
    name: "dicio",
    description: "Puxa uma palavra especifica do Dicio.com.br",
    aliases: ["dicionario"],
}
