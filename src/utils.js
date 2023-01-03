const os = require('os');
const prettyms = require("pretty-ms")

const utils = {}

utils.uptime = prettyms(Math.floor(process.uptime() * 1000), {colonNotation: true})

utils.usage = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100}MB`
utils.osUptime = prettyms(os.uptime() * 1000, {colonNotation: true})

module.exports = utils