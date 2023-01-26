import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    return "pajaH " + (await utils.upload("https://cataas.com/cat"));
};
export let config = {
    name: "cat",
    description: "Displays a random cat",
    aliases: ["catass", "randomcat", "rcat"],
    permission: "viewers",
    longDescription: "Displays in chat a photo of a random irl cat, taken from https://cataas.com/",
    cooldown: 5000
};
export let cooldownUsers = [];
