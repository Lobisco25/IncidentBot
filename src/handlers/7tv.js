const client = require('../services/tmi')
const EventSource = require("eventsource");
const source = new EventSource('https://events.7tv.app/v1/channel-emotes?channel=bytter_&channel=lobisco25&channel=feridinha&channel=nnuura');
source.addEventListener("update", (e) => {
    let data = JSON.parse(e.data)
    if(data.action == "ADD" ){
        client.say(data.channel, `@${data.actor} adicionou ${data.name} no 7TV`)
    }
    if(data.action == "REMOVE"){
        client.say(data.channel, `${data.actor} removeu o ${data.name} na 7TV`)
    }
    if(data.action == "UPDATE"){
        client.say(data.channel, `${data.actor} mudou o nome de ${data.emote.name} para ${data.name} na 7TV`)
        
    }
}, false);

