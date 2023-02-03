import utils from "../utils"
export const run = async (client, msg, args, cmd) => {
    if(!(await utils.checkImageServer())) return "image server offline, try again later"
    switch(args[0] === undefined ? " " : args[0].toLowerCase()) {
        case "cat": return await utils.upload("https://thiscatdoesnotexist.com")
        case "art": case "artwork": return await utils.upload("https://thisartworkdoesnotexist.com/")
        case "pepe": return await utils.upload(`http://www.thispepedoesnotexist.co.uk/out/pepe%20(${utils.random(9761)}).png`)
        case "waifu": return await utils.upload(`https://www.thiswaifudoesnotexist.net/example-${utils.random(100000)}.jpg`)
        case "sneaker": return await utils.upload(`https://thissneakerdoesnotexist.com/wp-content/plugins/sneaker-plugin/imsout2/${utils.randomBetween(1, 5)}-${utils.randomBetween(1, 5)}-${utils.randomBetween(1, 3)}-${utils.random(2000)}.jpg`)
        case "night": case "nightsky": case"sky": return await utils.upload(`https://firebasestorage.googleapis.com/v0/b/thisnightskydoesnotexist.appspot.com/o/images%2Fseed${utils.randomBetween(1000, 5000)}.jpg?alt=media`) 
        case undefined: default: return await utils.upload("https://thispersondoesnotexist.com/image")
    }
}
export let config = {
    name: 'doesnotexist',
    description: 'displays something that does not exist',
    aliases: ['dne'],
    permission: "viewers",
    longDescription: `sends a random image of something that does not exist in chat, that can be a cat, a person, a waifu (NaM), a sneaker, a night sky or a piece of art.
        websites used: 
        https://thiscatdoesnotexist.com, 
        https://thisartworkdoesnotexist.com/, 
        http://www.thispepedoesnotexist.co.uk/, 
        https://www.thiswaifudoesnotexist.net/, 
        https://thissneakerdoesnotexist.com/, 
        https://thisnightskydoesnotexist.appspot.com/, 
        https://thispersondoesnotexist.com/
    `,
    cooldown: 5000,
    whisper: true
}
export let cooldownUsers = []