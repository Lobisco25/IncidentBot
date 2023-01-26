import express from "express";
import config from "../config";
import commands from "../src/handlers/tmi";
import path from "path";
import utils from "../src/utils";
import commitCount from "git-commit-count";
import db from "../src/services/db";
import log from "../src/log";
const app = express();

app.use(express.static(path.join(__dirname + "/public")));

const css = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
    background-color: #101010;
    font-family: "Inter", sans-serif;
}

header {
    color: white;
    text-align: center;
}

header h1 {
    display: inline-block;
}

header h1 a {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}

header h1 a:hover {
    color: #b8b5b5
}

.info {
    color: white;
    text-align: center;
}

.info h2 {
    margin: 5px;
}


.info a {
    color: white;
    text-decoration: underline;
    transition: color 0.2s ease;
}

.info a:hover {
    color: #b8b5b5
}

.stats {
    color: white;
    text-align: center;
}

.commands  {
    color: white;
    text-align: center;
}

.commands h2 {
    display: inline-block;
}

.commands table {
    padding: 2px auto;
    width: 100%;
    color: white;
    border-collapse: collapse !important;
}

.commands table tr th {
    height: 40px;
    background-color: #131313;
}

.commands table tr td {
    height: 40px;
    background-color: #0e0d0d;
}

.commands table tr th, .commands table tr td {
    padding: 2px 5px;
    border: 1px solid white;
}

.commands table tr td a {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}

.commands table tr td a:hover {
    color: #b8b5b5
}`;

app.get("/", async (req, res) => {
    const channelDB = await db("channels").select("*");
    const seventvChannelDB = await db("channels").where({ seventv_events: 1 });
    res.send(`
    <head>
        <title>incidentbot</title>
        <style>
         ${css}
        </style>
    </head>
    <body>
        <header><h1><a href="/bot">incidentbot</a></h1></header>
        <div class="info">
            <h2>info</h2><br>
            this is the website for incidentbot, a twitch bot made by <a href="https://lobis.co">lobisco</a><br>
            you can find a list of commands <a href="/bot/commands">here</a>
        </div>
        <div class="stats">
            <h2>stats</h2>
            <ul>
                <li>uptime: ${utils.uptime}</li>
                <li>memory usage: ${utils.usage}</li>
                <li>server: ${utils.osUptime}</li>
                <li>total commits: ${commitCount()}</li>
                <li>${channelDB.length} channels in total</li>
                <li>${seventvChannelDB.length} channels with 7tv events</li>
            </ul>
        </div>
    </body>
        `);
});

app.get("/commands", (req, res) => {
    res.send(`
    <head>
        <title>incidentbot</title>
        <style>
        ${css}
       </style>
    </head>
    <body>
    <header><h1><a href="/bot">incidentbot</a></h1></header>
    <div class="commands">
        <h2>commands</h2>
        <table>
            <tr>
                <th>name</th>
                <th>description</th>
                <th>permission</th>
            </tr>
            <tr>
            ${Object.keys(commands)
                .map((c) => {
                    return `
                <tr>
                    <td><a href="commands/${commands[c].config.name}"> ${commands[c].config.name}<a/></td>
                    <td>${commands[c].config.description}</td>
                    <td>${commands[c].config.permission}</td>
                </tr>
                `;
                })
                .join("")}
            </tr>
        </table>
    </div>
    </body>
    `);
});

app.get("/commands/:cmd", (req, res) => {
    const cmd = commands[req.params.cmd];
    if (!cmd) return res.send("command not found");
    res.send(`
    <head>
        <title>command ${cmd.config.name}</title>
        <style>
        ${css}
       </style>
    </head>
    <body>
    <header><h1><a href="/bot">incidentbot</a></h1></header>
    <div class="commands">
        <h2>-${cmd.config.name}</h2>
        <table>
            <tr>
                <th>name</th>
                <td>${cmd.config.name}</td>               
            </tr>
            <tr>
                <th>aliases</th>
              <td>${cmd.config.aliases.join(", ")}</td>
            </tr>
            <tr>
                <th>description</th>
                <td>${cmd.config.description ?? "none"}</td>
            </tr>
            <tr>
                <th>long description</th>
                <td>${cmd.config.longDescription ?? "none"}</td>
            <tr>
                <th>permission</th>
                <td>${cmd.config.permission}</td>
            </tr>
        </table>
    </div>
    </body>
    `);
});

app.listen(config.port || 3000, () => {
    log.info(`Server is running on port ${config.port || 3000}`);
});