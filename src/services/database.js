const mongoose = require("mongoose")
const log = require("../handlers/logger")

mongoose
    .connect(process.env.MONGODB_PASSWORD)
    .catch((err) => {
        log.critical("Erro ao iniciar conexão com database ", err)
    })

module.exports = mongoose
