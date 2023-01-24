import utils from "../utils"
import _config from "../../config"
export const run = async (client, msg, args, cmd) => {
    const arg = args[0] === undefined ? " " : args[0].toLowerCase

    const defaultCase = await utils.http.get("https://api.api-ninjas.com/v1/facts?limit=1", { "X-Api-Key": _config.apis.apiNinjas })
    const cat = await utils.http.get("https://catfact.ninja/fact", {
        accept: "application/json",
        "X-CSRF-TOKEN": _config.apis.catFacts,
    })
    const dog = await utils.http.get("https://dog-api.kinduff.com/api/facts")
    const numbers = await utils.http.get(`https://numbersapi.p.rapidapi.com/${!args[1] ? "random" : args[1]}/trivia?json=true`, {
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
        "X-RapidAPI-Key": _config.apis.rapidKey
    })
    switch (arg) {
        default: return defaultCase[0].fact
        case "cats": case "cat": return cat.fact
        case "dogs": case "dog": return dog.facts
        case "numbers": case "number":  return numbers.text
    }
}
export let config = {
    name: 'fact',
    description: '',
    aliases: ['facts', 'rfacts', 'randomfacts'],
    cooldown: 5000
}
export let cooldownUsers = []


