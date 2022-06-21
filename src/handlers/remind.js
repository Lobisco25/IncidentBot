const client = require("../services/tmi")
const UserModel = require("../models/User")

client.on("message", async (channel, tags, message, self) => {
    try {
        const user = await UserModel.findOne({ to: tags["display-name"] })
        if (user.remind[0].to == tags["display-name"]) {
            await client.say(
                channel,
                `${user.remind[0].to}, Você tem um novo remind de ${user.remind[0].from}: ${user.remind[0].message}`
            )
            user.remind = undefined
            user.save()
        }
    } catch (error) {
        console.log(error)
    }
})
