import utils from "../utils";
import _config from "../../config";
import db from "../services/db";
import vm from "vm";
import os from "os";
export const run = async (client, msg, args, cmd) => {
    try {
        const context = {
            client: client,
            msg: msg,
            args: args,
            cmd: cmd,
            utils: utils,
            db: db,
            process: process,
            os: os,
        };
        let script;

        if (!args.includes("return")) {
            script = args.join(" ");
        } else {
            script = `(async () => {${args.join(" ")}})()`;
        }

        vm.createContext(context);
        return vm.runInContext(script, context);
    } catch (e) {
        if(e.message === "await is only valid in async functions and the top level bodies of modules") return "error: missing return statement"
        return "error: " + e.message;
    }
};
export let config = {
    name: "debug",
    description: "dev-only command for running code",
    aliases: ["js", "ts", "eval"],
    cooldown: 5000,
    whisper: true,
    permission: "dev",
    namePattern: "",
    longDescription: "dev-only command for debugging javascript code",
    usage: "debug <code>",
};
export let cooldownUsers = [];
