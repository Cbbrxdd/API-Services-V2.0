require('events').EventEmitter.defaultMaxListeners = 20000;
const { Client, Partials } = require('discord.js');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
process.env['NODE_ENV'] = 'production';
const glob = require("glob");

global.config = {}; const configFiles = glob.sync(__dirname + "/Core/Settings/**/**/*.js");
for (const file of configFiles) {
    const command = require(`./${file}`); Object.assign(global.config, command)
};

global.functions = {}; const functionFiles = glob.sync(__dirname + "/Core/Functions/**/**/*.js");
for (const file of functionFiles) { const command = require(`./${file}`); Object.assign(global.functions, command) };

const client = global.client = new Client({ intents: [3276799], partials: [Partials.Channel, Partials.User, Partials.GuildMember] }); global.client.login(global.config.token);
const eventFiles = glob.sync('./Core/Events/**/*.js'); for (const file of eventFiles) {const event = require(`./${file}`); client.on(event.name, event.execute) }

global.apiler = new Map(); const apiFiles = glob.sync(__dirname + "/Core/API/**/*.js");
for (const file of apiFiles) { const command = require(`./${file}`); if (!command.names) continue; command.names.forEach(name => { global.apiler.set(name, command) }) };

require("./Core/Databases/connect");
require("./Core/API");