const mongoose = require("mongoose")

const suggestSchema = new mongoose.Schema({
    name: String,
    suggest: String
})

module.exports = mongoose.model("SuggestDB", suggestSchema)