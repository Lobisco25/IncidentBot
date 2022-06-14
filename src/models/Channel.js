const mongoose = require("../services/database")

const ChannelSchema = new mongoose.Schema({
    twitch_name: String,
    customPrefix: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model("Channel", ChannelSchema)
