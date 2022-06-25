const client = require("../services/tmi")
const UserModel = require("../models/User")

client.on("message", async (channel, tags, message, self) => {
    try {
        const user = await UserModel.findOne({ twitch_id: tags["user-id"] })
        if(!user || user.remind[0] === undefined) return
        else {
            await client.say(
                channel,
                `${tags.username}, Você tem um novo remind de ${user.remind[0].from}: ${user.remind[0].message}`
            )
            user.remind = undefined
            user.save()
        }
    } catch (error) {
        console.log(error)
    }
})
