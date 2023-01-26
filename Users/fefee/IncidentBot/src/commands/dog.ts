import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    return "pajaH " + (await utils.upload("https://source.unsplash.com/random/?dog"));
};
export let config = {
    name: "dog",
    description: "displays a random dog",
    aliases: ["rdog", "randomdog"],
    cooldown: 5000,
    permission: "viewers",
    longDescription: "Displays in chat a photo of a random irl dog, taken from the unsplash library https://unsplash.com"
};
export let cooldownUsers = [];
