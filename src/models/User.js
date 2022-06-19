const mongoose = require("../services/database")

const UserSchema = new mongoose.Schema({
    twitch_name: String,
    twitch_id: String,
    city: String,
    isafk: {
        type: Boolean,
        required: false
    },
    afkmessage: {
        type: String,
        required: false
    },
    afktime: Date,
})

module.exports = mongoose.model("User", UserSchema)