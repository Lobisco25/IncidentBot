const express = require("express")
const app = express()
const port = 9000

const client = require("../services/tmi")
const ChannelModel = require("../models/Channel")

app.get("/", (req, res) => {
    res.send("ola")
})

app.get("/api/commands", (req, res) => {
    res.send(client.commands)
})

app.get("/api/status", async (req, res) => {
    const channelDB = await ChannelModel.find({})
    const status = {
        channelCount: channelDB.length
    }
    res.send(status)
})

app.get("/api/command/:cmd", (req, res) => {
        res.send(client.commands[req.params.cmd]?.config)
})





app.listen(port, () => {
    console.log(`escuta ${port}`)
})