require("colors")
const log = console.log

const info = (message) => {
    log(`[INFO]`.white, message || "")
}

const debug = (message) => {
    log(`[DEBUG]`.grey, message || "")
}

const warn = (message) => {
    log(`[WARN]`.yellow, message || "")
}

const error = (message) => {
    log(`[ERROR]`.red.bold, message || "")
}


module.exports = {
    info,
    debug,
    warn,
    error,
}