import db from "../services/db";
import utils from "../utils";
export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "no argument provided";
    const suggestion = args.join(" ");
    const arg = args[0].toLowerCase();
    let id = utils.generateID(4);
    const checkID = async () => {
        const suggestion = await db("suggestions").where({ id: id }).select("*");
        if (suggestion.length > 0) {
            id = utils.generateID(4);
            checkID();
        }
    };
    const defaultCase = async () => {
        checkID();
        await db("suggestions").insert({
            twitch_name: msg.senderUsername,
            desc: suggestion,
            id: id,
        });
        return `your suggestion was sent to the developer and it will be reviewed soon (ID: ${id})`;
    };
    const check = async () => {
        if (!args[1]) return "no id provided";
        const suggestion = await db("suggestions").where({ id: args[1] }).select("*");
        if (suggestion.length == 0) return "suggestion not found";
        return `suggestion "${suggestion[0].id}": "${suggestion[0].desc}" | status: ${suggestion[0].status} | category: ${
            suggestion[0].category ?? "none"
        } ${suggestion[0].comment ? `| comment: "${suggestion[0].comment}"` : " "}`;
    };
    const deleteCase = async () => {
        if (!args[1]) return "no id provided";
        if (args[1] == "all") {
            await db("suggestions").where({ twitch_name: msg.senderUsername, status: "Pending" }).del();
            return "all pending suggestions deleted";
        }
        const suggestion = await db("suggestions").where({ id: args[1] }).select("*");
        if (suggestion.length == 0) return "suggestion not found";
        if (suggestion[0].twitch_name != msg.senderUsername) return "you can't delete other people's suggestions";
        if (suggestion[0].status == "Approved") return "you can't delete approved suggestions, info on -suggest check";
        if (suggestion[0].status == "Rejected") return "you can't delete rejected suggestions, info on -suggest check";
        await db("suggestions").where({ id: args[1] }).del();
        return "suggestion deleted";
    };
    const update = async () => {
        if (!args[1]) return "no id provided";
        const suggestion = await db("suggestions").where({ id: args[1] }).select("*");
        if (suggestion.length == 0) return "suggestion not found";
        if (suggestion[0].twitch_name != msg.senderUsername) return "you can't update other people's suggestions";
        if (suggestion[0].status == "Approved") return "you can't update approved suggestions, info on -suggest check";
        if (suggestion[0].status == "Rejected") return "you can't update rejected suggestions, info on -suggest check";
        if (!args[2]) return "no argument provided";
        await db("suggestions")
            .where({ id: args[1] })
            .update({ desc: args.slice(2).join(" ") });
        return "suggestion updated";
    };
    const list = async () => {
        const pendingSuggestions = await db("suggestions").where({ twitch_name: msg.senderUsername, status: "Pending" }).select("*");
        const approvedSuggestions = await db("suggestions").where({ twitch_name: msg.senderUsername, status: "Approved" }).select("*");
        const rejectedSuggestions = await db("suggestions").where({ twitch_name: msg.senderUsername, status: "Rejected" }).select("*");
        const suggestions = pendingSuggestions.length + approvedSuggestions.length + rejectedSuggestions.length;
        if (suggestions == 0) return "you don't have any suggestions";
        switch (args[1]) {
            default:
                return `You have ${suggestions} suggestions, ${approvedSuggestions.length} were approved, ${rejectedSuggestions.length} were rejected and ${pendingSuggestions.length} are still pending. use rejected, approved or pending argument to get the ids of each one`;
            case "approved":
                return `approved suggestions (${approvedSuggestions.length}): ${approvedSuggestions.map((s) => s.id).join(", ")}`;
            case "rejected":
                return `rejected suggestions (${rejectedSuggestions.length}): ${rejectedSuggestions.map((s) => s.id).join(", ")}`;
            case "pending":
                return `pending suggestions (${pendingSuggestions.length}): ${pendingSuggestions.map((s) => s.id).join(", ")}`;
        }
    };
    switch (arg) {
        default:
            return await defaultCase();
        case "check":
            return await check();
        case "delete":
            return await deleteCase();
        case "update":
            return await update();
        case "list":
            return list();
    }
};
export let config = {
    name: "suggest",
    description: "suggest something to the developer",
    aliases: ["suggestion"],
    cooldown: 10000,
    permission: "viewers",
    longDescription: "in this command, you can suggest something to the developer, you can also check, delete, update and list your suggestions with the suggestion's id",
};
export let cooldownUsers = [];
