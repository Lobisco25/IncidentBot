const math = require('mathjs')
exports.run = (client, args, channel, tags, message) => {
    const input = args.join(" ")
    const result = math.evaluate(input)

    if (Number(input) == NaN) return;
    if (!args[0]) {
        let say = {
        pt: "pajaDank você esqueceu de dar um input",
        en: "pajaDank you forgot to give an input"
        }
        return say
    }

    else {
        let say = {
            pt: result,
            en: result
        }
        return say
    }
}

module.exports.config = {
    name: "math",
    description: "Realiza operações matematicas",
    aliases: ["calculadora", "calc"],
    cooldown: 5000,
}
