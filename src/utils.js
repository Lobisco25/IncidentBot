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

utils.http = {}

utils.http.get = async (url, headers, params) => {
    const result = await axios.get(url, {headers: headers, params: params})
    return result.data
}

utils.formatMS = (asd, options) => { return prettyms(asd, options) }

utils.getEmote = async (channel, emotes, emoji) => {
    const result = await axios.get(`https://7tv.io/v3/users/twitch/${channel}`)
    const res = result.data
    const AvailableEmotes = []
    emotes.forEach(element => {
        if(res.emote_set.emotes.some(e => e.name === element)) { AvailableEmotes.push(element) }
    })
    const asd = Math.floor(Math.random() * AvailableEmotes.length)
    console.log(!AvailableEmotes.length)
    const emote = () => {
        if(!AvailableEmotes.length) return emoji
        else return AvailableEmotes[asd]
    }
    console.log(emote())
    return emote()
}

utils.getUser = async (username) => {
    const result = await axios.get(`https://api.ivr.fi/v2/twitch/user?login=${username}`)
    const res = result.data 
    return res[0]
}

utils.get7TV_id = async (username) => { 
    const resultivr = await axios.get(`https://api.ivr.fi/v2/twitch/user?login=${username}`)
    const resivr = resultivr.data
    const result7tv = await axios.get(`https://7tv.io/v3/users/twitch/${resivr[0].id}`)
    const res7tv = result7tv.data 
    console.log(res7tv.user.id)
    return res7tv.user.id
}
module.exports = utils