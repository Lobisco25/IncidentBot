import { exec } from 'child_process'
import _config from "../../config"
export const run = async (client, msg, args, cmd) => {
    if(_config.devEnv) return "can't restart in dev environment"
    await client.privmsg(msg.channelName, "pulling + restarting...")
    await exec("git pull")
    await exec("pnpm i")

    await process.exit()
}
export let config = {
name: 'restart',
description: 'simple donk command for restarting the bot',
aliases: [''],
cooldown: 5000,
permission: "dev",
whisper: true,
namePattern: '',
usage: 'restart',
}
export let cooldownUsers = []