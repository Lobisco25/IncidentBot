exports.run = (client, msg, args, cmd) => {
    if(!args[0]) {
        let say = {
            pt: "você se colocou na cama :(",
            en: "you tucked yourself to bed :("
        } 
        return say
    }
    if (!args[1]) {
        let say = {
            pt: `você colocou ${args[0]} na cama :) 🛏 `,
            en: `you tucked ${args[0]} to bed :) 🛏`
        }
        return say
    } else {
        let say = {
            pt: `você colocou ${args[0]} na cama ${args[1]} 👉 🛏 `,
            en: `you tucked ${args[0]} to bed ${args[1]} 👉 🛏`
        }
        return say
    }
}
module.exports.config = {
    name: "tuck",
    description: "Coloca o usuário especificado na cama",
    aliases: ["bytter"],
}
