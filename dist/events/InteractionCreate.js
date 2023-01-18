"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const commands = new discord_js_1.Collection();
const commandsPath = node_path_1.default.join(__dirname, '../commands');
const commandFiles = node_fs_1.default.readdirSync(commandsPath);
for (const file of commandFiles) {
    const filePath = node_path_1.default.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command || !command.disabled)
        commands.set(command.data.name, command);
}
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        const InteractionCommand = await commands.get(interaction.commandName);
        if (!InteractionCommand) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            await InteractionCommand.execute(interaction);
        }
        catch (err) {
            console.error(err);
            await interaction.reply({ content: "Une erreur est parvenue lors de l'éxecution de cette commande", ephemeral: true });
        }
    }
};
