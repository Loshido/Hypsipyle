const { REST, Routes } = require('discord.js');
require("dotenv").config()
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./dist/commands/${file}`);
	if(!command.disabled) commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, "1063497231275143239"),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();