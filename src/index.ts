import { Client, GatewayIntentBits } from "discord.js"
import fs from "node:fs"
import path from "node:path"
import { config } from "dotenv"
config()

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages
	]
})

import db from "./database/index"

(async () => {
	try {
		await db.sequelize.authenticate();
		console.log('Connection has been established successfully.');
		db.Models.forEach(Model => db.sequelize.define(Model.name, Model.schema))
		await db.sequelize.sync()
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
		process.exit(1)
	}
})()

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else if(event.once && event.database) client.once(event.name, (...args) => event.execute(db.sequelize, ...args));
	else if(event.database) client.on(event.name, (...args) => event.execute(db.sequelize, ...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

client.login(process.env.TOKEN)
process.addListener("beforeExit", () => {
	db.sequelize.close()
})