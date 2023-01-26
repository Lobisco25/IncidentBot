const mongoose = require("../services/database")

const ChannelSchema = new mongoose.Schema({
    twitch_name: String,
    customPrefix: {
        type: String,
        required: false,
    },
    SevenTV_Events: Boolean,
    lang: String
})

module.exports = mongoose.model("Channel", ChannelSchema)
