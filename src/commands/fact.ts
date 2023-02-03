import utils from "../utils";
import _config from "../../config";
export const run = async (client, msg, args, cmd) => {
    const arg = args[0] === undefined ? " " : args[0].toLowerCase();

    const defaultCase = await utils.http.get("https://api.api-ninjas.com/v1/facts?limit=1", {
        "X-Api-Key": _config.apis.apiNinjas,
    });
    const cat = await utils.http.get("https://catfact.ninja/fact", {
        accept: "application/json",
        "X-CSRF-TOKEN": _config.apis.catFacts,
    });
    const dog = await utils.http.get("https://dog-api.kinduff.com/api/facts");
    const numbers = await utils.http.get(
        `https://numbersapi.p.rapidapi.com/${!args[1] ? "random" : args[1]}/trivia?json=true`,
        {
            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
            "X-RapidAPI-Key": _config.apis.rapidKey,
        }
    );
    console.log(arg);
    switch (arg) {
        case "cats":
        case "cat":
            return cat.fact;
        case "dogs":
        case "dog":
            return dog.facts;
        case "numbers":
        case "number":
            return numbers.text;
        default:
            return defaultCase[0].fact;
    }
};
export let config = {
    name: "fact",
    description: "displays random facts",
    aliases: ["facts", "rfacts", "randomfacts"],
    cooldown: 5000,
    permission: "viewers",
    longDescription: `Displays in chat a random fact, from a cat, a dog, a number or a random fact
        websites used:
        https://catfact.ninja/
        https://dog-api.kinduff.com/
        https://numbersapi.p.rapidapi.com/
        https://api.api-ninjas.com/
        `,
        whisper: true
};
export let cooldownUsers = [];
