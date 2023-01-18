"use strict";
const discord_js_1 = require("discord.js");
module.exports = {
    disabled: true,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping command that relies with Pong!"),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
};
