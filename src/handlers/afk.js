const client = require("../services/tmi")
const UserModel = require("../models/User")


client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({twitch_id: tags["user-id"]})
    if(!user) return
    if(!user.afk?.time) return
    
    var output = null
    switch (user.afk._type) {
        case "afk":
            output = `${tags.username} voltou de seu AFK: ${user.afk.message}`
            break
        case "study":
            output = `${tags.username} terminou de estudar: ${user.afk.message}`
            break
        case "code":
            output = `${tags.username} terminou de programar: ${user.afk.message}`
            break
        case "gn":
            output = `${tags.username} acordou: ${user.afk.message}`
            break
        case "workout":
            output = `${tags.username} acabou de malhar: ${user.afk.message}` 
    }
    await client.say(channel, output)

    user.afk = undefined
    user.save()
})