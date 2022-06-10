const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_PASSWORD)

module.exports = mongoose
