import express from "express";
import config from "../config";
import client from "../src/services/tmi"
import path from "path";
import utils from "../src/utils";
import commitCount from "git-commit-count";
import db from "../src/services/db";
import log from "../src/log";
const app: any = express();

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

.info a {
    color: white;
    text-decoration: underline;
    transition: color 0.2s ease;
}

.info a:hover {
    color: #b8b5b5
}

.info h2 {
    margin: 2px;

}

.stats {
    color: white;
    text-align: center;
}


.table  {
    color: white;
    text-align: center;
}

.table h2 {
    display: inline-block;
}

.table table {
    padding: 2px auto;
    width: 100%;
    color: white;
    border-collapse: collapse !important;
}

.table table tr th {
    height: 40px;
    background-color: #131313;
}

.table table tr td {
    height: 40px;
    background-color: #0e0d0d;
}

.table table tr th, .table table tr td {
    padding: 2px 5px;
    border: 1px solid white;
}

.table table tr td a {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}

.table table tr td a:hover {
    color: #b8b5b5
}`;


app.get("/404", (req, res) => {
    res.send(`
    <head>
        <title>404 - incidentbot</title>
        <style>
            ${css}
        </style>
    </head>
    <body>
        <header><h1><a href="/bot">incidentbot</a></h1></header>
        <div class="info">
            <h2>404</h2>
            <p>the page you are looking for does not exist</p>
        </div>
    </body>
    `);
});

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
            <p>this is the website for incidentbot, a twitch bot made by <a href="https://lobis.co">lobisco</a></p>
            <p>you can find a list of commands <a href="/bot/commands">here</a></p>
            <p>you can find a list of channels with incidentbot <a href="/bot/channels">here</a></p>
        </div>
        <div class="stats">
            <h2>stats</h2>
            <p>ping to TMI: ${await utils.ping()}</p>
            <p>running with ${Object.keys(client.commands).length} commands</p>
            <p>${channelDB.length} channels in total</p>
            <p>${seventvChannelDB.length} channels with 7tv events</p>
                <p>running with node ${process.version}</p>
                <p>uptime: ${utils.uptime}</p>
                <p>memory usage: ${utils.usage}</p>
                <p>server: ${utils.osUptime}</p>
                <p>total commits: ${commitCount()}</p>
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
    <div class="table">
        <h2>commands</h2>
        <table>
            <tr>
                <th>name</th>
                <th>description</th>
                <th>permission</th>
            </tr>
            <tr>
            ${Object.keys(client.commands)
                .map((c) => {
                    return `
                <tr>
                    <td><a href="commands/${client.commands[c].config.name}"> ${client.commands[c].config.name}<a/></td>
                    <td>${client.commands[c].config.description}</td>
                    <td>${client.commands[c].config.permission}</td>
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
    const cmd = client.commands[req.params.cmd];
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
    <div class="table">
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
                <th>cooldown</th>
                <td>${cmd.config.cooldown ? `${cmd.config.cooldown / 1000} seconds` : "none"}</td>
            </tr>
            <tr>
                <th>description</th>
                <td>${cmd.config.description ?? "none"}</td>
            </tr>
            |<tr>
                <th>usage</th>
                <td>${cmd.config.usage ?? "not defined"}</td>
            <tr>
                <th>long description</th>
                <td>${cmd.config.longDescription ?? "none"}</td>
            </tr>
                <th>permission</th>
                <td>${cmd.config.permission}</td>
            </tr>
        </table>
    </div>
    </body>
    `);
});

app.get("/channels", async (req, res) => {
    const channels = await db("channels").select("*");
    res.send(`
    <head>
        <title>channels</title>
        <style>
        ${css}
         </style>
    </head>
    <body>
    <header><h1><a href="/bot">incidentbot</a></h1></header>
    <div class="table">
        <h2>channels</h2>
        <h3> running on ${channels.length} channels</h3>
        <table>
            <tr>
                <th>name</th>
                <th>custom prefix</th>
                <th>7tv events</th>
            </tr>
            ${channels
                .map((c) => {
                    return `
                <tr>
                    <td>${c.twitch_name}</td>
                    <td>${c.custom_prefix ?? "none"}</td>
                    <td>${c.seventv_events ? "enabled" : "disabled"}</td>
                </tr>
                `;
                })
                .join("")}
        </table>
    </div>
    </body>
    `);
});


app.get("/suggestion/:id", async (req, res) => { 
    const id = req.params.id;
    if (!id) return res.redirect("/bot/404");
    const suggestion = await db("suggestions").where({ id: id }).first();
    if (!suggestion) return res.redirect("/bot/404");
    res.send(`
    <head>
        <title>suggestion ${suggestion.id}</title>
        <style>
        ${css}
         </style>
    </head>
    <body>
    <header><h1><a href="/bot">incidentbot</a></h1></header>
    <div class="table">
        <table>
            <tr>
                <th>id</th>
                <td>${suggestion.id}</td>
            </tr>
            <tr>
                <th>user</th>
                <td>${suggestion.user}</td>
            </tr>
            <tr>
                <th>description</th>
                <td>${suggestion.desc}</td>
            </tr>
            <tr>
                <th>status</th>
                <td>${suggestion.status}</td>
            </tr>
            <tr>
                <th>created at</th>
                <td>${suggestion.date}</td>
            </tr>
            <tr>
                <th> dev's comment </th>
                <td>${suggestion.comment ?? "none"}</td>
            </tr>
        </table>
    </div>
    </body>
    `);
});


app.listen(config.port || 3000, () => {
    log.info(`web instance is running on port ${config.port || 3000}`);
});