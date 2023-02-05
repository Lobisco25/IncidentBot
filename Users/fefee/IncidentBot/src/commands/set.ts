import db from '../services/db';
import utils from '../utils';
export const run = async (client, msg, args, cmd) => {
    if (!args[0]) return "no arguments provided"
    
    const setCommands = async () => {
        const commandsDB = await db("commands").where({ name: args[1] })
        if (commandsDB.length === 0) return "command not found"
        const state = commandsDB[0].disabled ^ 1

        await db("commands").where({ name: args[1] }).update({ disabled: state })

        return `command ${args[1]} updated to ${state === 1 ? "disabled" : "enabled"}`
    }
    switch(args[0].toLowerCase()) {
        case "commands": case "command": return setCommands()
        default: return "invalid argument"
    }    
}
export let config = {
name: 'set',
description: '',
aliases: [''],
cooldown: 5000,
whisper: true,
usage: 'set {argument} [value]',
perission: 'devs',
namePattern: `{name}, `
}
export let cooldownUsers = []