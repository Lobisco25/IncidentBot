exports.run = (client, args, channel, tags, message, user) => {
 
    const mongoose = require("mongoose")
    const SuggestDB = require('../suggest_schema')
    mongoose.connect("mongodb+srv://IncidentAcess:BDgNU9uLTokgJ4Ry@cluster0.gpims.mongodb.net/?retryWrites=true&w=majority")
    
    
    async function suggesting() {
        const user = await SuggestDB.create({
            name: tags.username,
            suggest: args.join(' ')
        })
        console.log(user)
        client.say(channel, `A sua sugestão foi anotada!`)
    }
    
    suggesting()
    
    
    }
    module.exports.config = {
    name: 'suggest',
    description: 'Manda uma sugestão para o bot',
    cooldown: 5000,
    aliases: ['sg']
    }