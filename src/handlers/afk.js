const client = require("../services/tmi")
const UserModel = require("../models/User")

client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({twitch_id: tags["user-id"]})
    if(!user) return
    if(!user.isafk === true) return
    else {
        await UserModel.findOneAndUpdate(
            { twitch_id: tags["user-id"] },
            { isafk: false }
        )
        await client.say(
            channel,
            `${tags.username} voltou de seu afk: ${user.afkmessage}`
        )
    }
    
})