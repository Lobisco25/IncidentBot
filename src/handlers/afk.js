const client = require("../services/tmi")
const UserModel = require("../models/User")
const ms = require("ms")

client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({twitch_id: tags["user-id"]})
    if(!user) return
    if(!user.afk?.time) return


    const time = ms(Date.now() - user.afk.time)
    
    var output = null
    switch (user.afk._type) {
        case "afk":
            output = `${tags.username} voltou de seu AFK: ${user.afk.message} (${time})`
            break
        case "study":
            output = `${tags.username} terminou de estudar: ${user.afk.message} (${time})`
            break
        case "code":
            output = `${tags.username} terminou de programar: ${user.afk.message} (${time})`
            break
        case "gn":
            output = `${tags.username} acordou: ${user.afk.message} (${time})`
            break
        case "workout":
            output = `${tags.username} acabou de malhar: ${user.afk.message} (${time})` 
    }
    await client.say(channel, output)

    user.afk = undefined
    user.save()
})