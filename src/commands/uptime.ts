import {  SlashCommandBuilder, CommandInteraction } from "discord.js";
export = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Gives how long it has been since the client last started up."),
    async execute(interaction: CommandInteraction) {
        const uptime = interaction.client.uptime
        await interaction.reply({
            content: `Le bot est démarré depuis ${Math.floor(uptime/1000)}s.`
        })
    }
}