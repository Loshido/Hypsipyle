"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages
    ]
});
const index_1 = __importDefault(require("./database/index"));
(async () => {
    try {
        await index_1.default.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        index_1.default.Models.forEach(Model => index_1.default.sequelize.define(Model.name, Model.schema));
        await index_1.default.sequelize.sync();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();
const eventsPath = node_path_1.default.join(__dirname, 'events');
const eventFiles = node_fs_1.default.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventsPath, file);
    const event = require(filePath);
    if (event.once)
        client.once(event.name, (...args) => event.execute(...args));
    else if (event.once && event.database)
        client.once(event.name, (...args) => event.execute(index_1.default.sequelize, ...args));
    else if (event.database)
        client.on(event.name, (...args) => event.execute(index_1.default.sequelize, ...args));
    else
        client.on(event.name, (...args) => event.execute(...args));
}
client.login(process.env.TOKEN);
process.addListener("beforeExit", () => {
    index_1.default.sequelize.close();
});
