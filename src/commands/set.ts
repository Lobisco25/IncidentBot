import utils from "../utils.js";
import db from "../services/db";
export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "no arguments provided";
    const command = async () => {
        if (!args[1]) return "no arguments provided";
        const value = await db("commands").where({ name: args[1] }).first();
        if (!value) return "invalid command";
        const disabledValue = value.disabled ^ 1;
        await db("commands").where({ name: args[1] }).update({ disabled: disabledValue });
        return `this command is now ${disabledValue ? "disabled" : "enabled"}`;
    };
    switch (args[0].toLowerCase()) {
        case "command":
            return await command();
        default:
            return "invalid argument";
    }
};
export let config = {
    name: "set",
    description: "",
    aliases: [""],
    cooldown: 5000,
    permission: "dev",
};
export let cooldownUsers = [];
