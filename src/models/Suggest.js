const mongoose = require("../services/database")

const SuggestSchema = new mongoose.Schema({
    author_name: String,
    message: String,
})

module.exports = mongoose.model("Suggest", SuggestSchema)
