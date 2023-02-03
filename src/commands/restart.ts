import { exec } from 'child_process'
export const run = async (client, msg, args, cmd) => {
    await client.privmsg(msg.channelName, "pulling + restarting...")
    await exec("git pull")
    await exec("pnpm i")
    process.exit()
}
export let config = {
name: 'restart',
description: 'simple donk command for restarting the bot',
aliases: [''],
cooldown: 5000,
permission: "dev",
whisper: true
}
export let cooldownUsers = []