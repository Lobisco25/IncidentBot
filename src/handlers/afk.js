const client = require("../services/tmi")
const UserModel = require("../models/User")

client.on("message", async (channel, tags, message, self) => {
    const user = await UserModel.findOne({twitch_id: tags["user-id"]})
    if(!user) return
    const duration = Math.floor(Date.now() - user.afktime)

    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      }
    if(!user.isafk === true) return
    else {
        await UserModel.findOneAndUpdate(
            { twitch_id: tags["user-id"] },
            { isafk: false }
        )
        await client.say(
            channel,
            `${tags.username} voltou de seu afk: ${user.afkmessage} (${msToTime(duration)})`
        )
    }
    
})