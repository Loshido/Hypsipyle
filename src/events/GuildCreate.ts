import { Events, Guild } from "discord.js";
import { Sequelize } from "sequelize"
export = {
    name: Events.GuildCreate,
    database: true,
    async execute(sequelize: Sequelize, guild: Guild) {
        await sequelize.models["Servers"].findOrCreate({
            where: {
                server_id: guild.id
            },
            defaults: {
                avatar: guild.icon,
                description: guild.description,
                server_id: guild.id,
                name: guild.name
            }
        })
    }
}