require("colors")
const log = console.log

const info = (...args) => {
    log(`[INFO]`.white, args.join(" "))
}

const debug = (...args) => {
    log(`[DEBUG]`.grey, args.join(" "))
}

const warn = (...args) => {
    log(`[WARN]`.yellow, args.join(" "))
}

const error = (...args) => {
    log(`[ERROR]`.red.bold, args.join(" "))
}

const critical = (... args) => {
    log(`[CRITICAL]`.red.bgYellow.bold, args.join(" "))
}

module.exports = {
    info,
    debug,
    warn,
    error,
    critical
}