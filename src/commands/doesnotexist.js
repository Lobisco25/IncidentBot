const utils = require("../utils")
exports.run = async (client, msg, args, cmd) => {
    const arg = args[0].toLowerCase()
    switch(arg) {
        default: return await utils.upload("https://thispersondoesnotexist.com/image")
        case "cat": return await utils.upload("https://thiscatdoesnotexist.com")
        case "art": case "artwork": return await utils.upload("https://thisartworkdoesnotexist.com/")
        case "pepe": return await utils.upload(`http://www.thispepedoesnotexist.co.uk/out/pepe%20(${utils.random(9761)}).png`)
        case "waifu": return await utils.upload(`https://www.thiswaifudoesnotexist.net/example-${utils.random(100000)}.jpg`)
        case "sneaker": return await utils.upload(`https://thissneakerdoesnotexist.com/wp-content/plugins/sneaker-plugin/imsout2/${utils.randomBetween(1, 5)}-${utils.randomBetween(1, 5)}-${utils.randomBetween(1, 3)}-${utils.random(2000)}.jpg`)
        case "night": case "nightsky": case"sky": return await utils.upload(`https://firebasestorage.googleapis.com/v0/b/thisnightskydoesnotexist.appspot.com/o/images%2Fseed${utils.randomBetween(1000, 5000)}.jpg?alt=media`) 
    }
}
module.exports.config = {
    name: 'doesnotexist',
    description: 'command',
    aliases: ['dne']
}