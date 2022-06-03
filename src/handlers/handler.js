const fs = require('fs')

const client = require('../Index.js')

const prefix = "*"
const canais = []

client.commands = new Map();
client.aliases = new Map();

fs.readdir('./src/commands', (err, files) => {
    if(err) console.log(err);

    const jsfile = files.filter(f => f.split('.').pop() == 'js');
    if(!jsfile) {
        console.log("Não foram encontrados comandos!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`../commands/${f}`);
        const cooldown = pull.config.cooldown
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name);
        })
    })
})


client.on('message', async (channel, tags, message, self) => {
    if(self) return;
    let args = message.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let cmdF = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if(!message.startsWith(prefix)) return;

    if(cmdF) {
        try {
            cmdF.run(client, args, channel, tags, message);
        } catch (err) {
            console.log("Erro ao rodar comando xDD: " + err)
        }
    }
})
