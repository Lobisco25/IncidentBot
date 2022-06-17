const mongoose = require("../services/database")

const UserSchema = new mongoose.Schema({
    twitch_name: String,
    twitch_id: String,
    city: String
})

module.exports = mongoose.model("User", UserSchema)