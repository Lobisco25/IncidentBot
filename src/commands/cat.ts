import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    console.log(await utils.checkImageServer())
    if(!(await utils.checkImageServer())) return "image server offline, try again later"

    let url;

    switch(args[0]) {
        case "unsplash": url = "https://source.unsplash.com/random/?cat"; break;
        case "gif": url = "https://cataas.com/cat/gif"; break;
        default: url = "https://cataas.com/cat"; break;
    }

    return `${await utils.getEmote(msg.channelID, ["peepoHappy", "pajaH", "SoCute"], "🐱")} ${await utils.upload(url)}`;
};
export let config = {
    name: "cat",
    description: "Displays a random cat",
    aliases: ["randomcat", "rcat"],
    permission: "viewers",
    longDescription: "Displays in chat a photo of a random irl cat, taken from the nsplash library and the website Cat as a Service",
    cooldown: 5000,
    whisper: true,
    namePattern: "{name}, ",
    usage: "cat [unsplash|gif]",
    websites: ["https://cataas.com/", "https://unsplash.com/"]


};
export let cooldownUsers = [];
