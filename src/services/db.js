const config = require("../../config");

const db = require("knex")({
    client: "mysql",
    version: "15.1",
    connection: {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        password: config.db.pswd,
        database: config.db.database
    }
})




module.exports = db