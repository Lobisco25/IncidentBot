const mongoose = require("../services/database")

const UserSchema = new mongoose.Schema({
    twitch_name: String,
    twitch_id: String,
    city: String,
    afk: {
        message: String,
        time: Date,
        _type: String,
        required: false,
    },
    remind: [
        {
            message: String,
            from: String,
        },
    ],
})

module.exports = mongoose.model("User", UserSchema)
