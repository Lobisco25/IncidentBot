export const run = async (client, msg, args, cmd) => {
    return "pajaCool incidentbot's site: https://lobis.co/bot" 
}
export let config = {
name: 'help',
description: '',
aliases: [''],
cooldown: 5000,
whisper: true,
permission: 'viewers',
usage: 'help [command]',
namePattern: `{name}, `

}
export let cooldownUsers = []