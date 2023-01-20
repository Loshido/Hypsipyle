import {  SlashCommandBuilder, CommandInteraction, bold } from "discord.js";
import { Sequelize } from "sequelize";

export = {
    database: true,
    data: new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Responds with the member's xp."),
    async execute(sequelize: Sequelize, interaction: CommandInteraction) {
        const userID = interaction.user.id
        const guildID = interaction.guildId
        if(userID && guildID) {
            const data = await sequelize.models.Members.findOne({
                where: {
                    user_id: userID,
                    server_id: guildID
                }
            })
            if(data) interaction.reply({ content: `Vous avez cumulé ${bold(data.dataValues.xp)} xp depuis le ${new Date(data.dataValues.createdAt).toLocaleDateString()}.` })
        } else return
    }
}