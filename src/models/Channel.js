const mongoose = require("../services/database")

const ChannelSchema = new mongoose.Schema({
    twitch_name: String
})

module.exports = mongoose.model("Channel", ChannelSchema)
