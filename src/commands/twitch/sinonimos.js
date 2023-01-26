exports.run = async (client, msg, args, cmd) => {
    const axios = require("axios")

    const enRes = "This command is not available in non-portuguese chats."

   const res = await axios({
    method: "GET",
    url: `https://significado.herokuapp.com/v2/sinonimos/${args[0]}`,
    validateStatus: () => true,
})
   
        if (res.status == 400 || res.data[0] == undefined) {
            let say = {
                pt: `essa palavra não está no dicionário FeelsDankMan`,
                en: enRes
            }
            return say
        } else if (res.data[0] == undefined) {
            let say = {
                pt: `pajaM ${res.data[0]}`,
                en: enRes
            }
            return say
        } else {
            let say = {
                pt: `pajaM 1: ${res.data[0]} | 2: ${res.data[1]}`,
                en: enRes
            }
            return say
        }
    
}
module.exports.config = {
    name: "sinonimos",
    description: "Retorna os sinônimos de uma palavra especifica do Dicio.com.br",
    aliases: ["sino", "sinônimos"],
}
