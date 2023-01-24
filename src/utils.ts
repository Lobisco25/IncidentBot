import os from 'os';
import prettyMilliseconds from 'pretty-ms';
import axios from 'axios';
import FormData from 'form-data';
import config from '../config';
import {v4 as uuid} from 'uuid';
import client from './services/tmi';

let utils: any = {}

utils.uptime = prettyMilliseconds(Math.floor(process.uptime() * 1000), {colonNotation: true})

utils.usage = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100}MB`
utils.osUptime = prettyMilliseconds(os.uptime() * 1000, {colonNotation: true})

utils.upload = async (url: any) => {
    const result = await axios({ url, responseType: "stream" })

    const formData = new FormData()
    formData.append("image", result.data, "incidentbot.jpg")
    const response = await axios.post("https://i.lobis.co/upload", formData, {
        headers: {
            "Content-Type": `multipart/form-data; bondary=${formData.getBoundary}`,
            auth: config.uploadPswd
        }
    })
    return await response.data
} 

utils.random = (max: number) => Math.floor(Math.random() * max);
utils.randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

utils.http = {}

utils.http.get = async (url: string, headers: any, params: any) => {
    const result = await axios.get(url, {headers: headers, params: params})
    return result.data
}

utils.formatMS = (asd: number, options: prettyMilliseconds.Options) => { return prettyMilliseconds(asd, options) }

utils.getEmote = async (channel: any, emotes: any[], emoji: any) => {
    const result = await axios.get(`https://7tv.io/v3/users/twitch/${channel}`)
    const res = result.data
    const AvailableEmotes = []
    emotes.forEach(element => {
        if(res.emote_set.emotes.some((e: { name: any; }) => e.name === element)) { AvailableEmotes.push(element) }
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

utils.getUser = async (username: any) => {
    const result = await axios.get(`https://api.ivr.fi/v2/twitch/user?login=${username}`)
    const res = result.data 
    return res[0]
}

utils.get7TV_id = async (username: any) => { 
    try {
        const resultivr = await axios.get(`https://api.ivr.fi/v2/twitch/user?login=${username}`)
    const resivr = resultivr.data
    const result7tv = await axios.get(`https://7tv.io/v3/users/twitch/${resivr[0].id}`)
    const res7tv = result7tv.data 
    return res7tv.user.id
    }
    catch {
        return null
    }
}

utils.generateID = (length: any) => { 
    let id = uuid().substring(0, length);
    return id
}

utils.ping = async () => {
    let asd = Date.now()
    await client.ping()
    return `${Date.now() - asd}ms`
}
export default utils