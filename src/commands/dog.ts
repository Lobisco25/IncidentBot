import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    if(!(await utils.checkImageServer())) return "image server offline, try again later"
    let url;
    const dog_ceo = await utils.http.get("https://dog.ceo/api/breeds/image/random");

    switch(args[0] === undefined ? " " : args[0].toLowerCase()) {
        case "unsplash": url = "https://source.unsplash.com/random/?dog"; break;
        default: url = dog_ceo.message ; break;
    }

    return `${await utils.getEmote(msg.channelID, ["SoCute", "peepoHappy", "pajaH"], "OhMyDog ")} ${await utils.upload(url)}`;
};
export let config = {
    name: "dog",
    description: "displays a random dog",
    aliases: ["rdog", "randomdog"],
    cooldown: 5000,
    permission: "viewers",
    longDescription: "Displays in chat a photo of a random irl dog, taken from the Unsplash library and the website Dog CEO",
    whisper: true,
    namePattern: "{name}, ",
    usage: "dog",
    websites: ["https://dog.ceo/", "https://unsplash.com/"]

};
export let cooldownUsers = [];
