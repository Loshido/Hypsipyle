import {  SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver } from "discord.js";

export = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Removes a given amount of message in the current channel.")
            .addIntegerOption(option => option
                .setName("amount")
                .setDescription("amount of messages to remove")
                .setMaxValue(300)
                .setMinValue(1)),
    async execute(interaction: CommandInteraction) {
        if(
            !interaction.isChatInputCommand() ||
            !interaction.memberPermissions?.has("ManageMessages")
        ) return

        const amount = interaction.options.getInteger("amount")
        const channel = await interaction.guild?.channels.fetch(interaction.channelId)
        if(channel?.isTextBased()) {
            const { size } = await channel.bulkDelete(amount || 10)
            interaction.reply({
                ephemeral: true,
                content: `${size} messages supprimés`
            })
        }
    }
}