exports.run = (client, args, channel, tags, message, user) => {
    require('dotenv').config({path: '.../.env'})
    const mongoose = require("mongoose")
    const SuggestDB = require('../models/suggest.js')
    mongoose.connect(process.env.MONGODB_PASSWORD)
    
    
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