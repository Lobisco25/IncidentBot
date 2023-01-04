const os = require('os');
const prettyms = require("pretty-ms")
const axios = require("axios")
const FormData = require("form-data");
const config = require('../config');

const utils = {}

utils.uptime = prettyms(Math.floor(process.uptime() * 1000), {colonNotation: true})

utils.usage = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100}MB`
utils.osUptime = prettyms(os.uptime() * 1000, {colonNotation: true})

utils.upload = async (url) => {
    const result = await axios({ url, responseType: "stream" })

    const formData = new FormData()
    formData.append("image", result.data, "incidentbot.jpg")
    const response = await axios.post("https://i.lobis.co/upload", formData, {
        headers: {
            "Content-Type": `multipart/form-data; bondary=${formData._bondary}`,
            auth: config.uploadPswd
        }
    })
    return await response.data
} 

utils.random = (max) => Math.floor(Math.random() * max);
utils.randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

module.exports = utils