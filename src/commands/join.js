exports.run = (client, args, channel, tags, message) => {
    if (!(tags.username == "bytter_" || tags.username == "lobisco25")) return;
    const fs = require("fs");
    const channelTarget = args[0].toLowerCase();
    var oldData = JSON.parse(fs.readFileSync('../channels.json'));
    oldData.channels.push(channelTarget);
    console.log(oldData)
    fs.writeFileSync("../channels.json", JSON.stringify(oldData, null, 2));
    client.join(channelTarget)
    client.say(channel, `Conectado com sucesso em ${args[0]} FeelsOkayMan`)
  };
  
  module.exports.config = {
    name: "join",
    description: "Join channels",
    cooldown: 5000,
    aliases: [],
  };
  
  // Ferida esteve aqui