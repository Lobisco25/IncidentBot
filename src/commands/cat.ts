import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    console.log(await utils.checkImageServer())
    if(!(await utils.checkImageServer())) return "image server offline, try again later"
    return "pajaH " + (await utils.upload("https://source.unsplash.com/random/?cat"));
};
export let config = {
    name: "cat",
    description: "Displays a random cat",
    aliases: ["catass", "randomcat", "rcat"],
    permission: "viewers",
    longDescription: "Displays in chat a photo of a random irl cat, taken from https://cataas.com/",
    cooldown: 5000,
    whisper: true
};
export let cooldownUsers = [];
