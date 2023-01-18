import {  SlashCommandBuilder, CommandInteraction } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping command that relies with Pong!"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply('Pong!')
    }
}