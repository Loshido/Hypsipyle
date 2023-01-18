import { Events, Guild } from "discord.js";
import { Sequelize } from "sequelize"
export = {
    name: Events.GuildCreate,
    database: true,
    async execute(sequelize: Sequelize, guild: Guild) {
        console.log("GuildCreate")
        await sequelize.models["Servers"].create({
            banner: guild.banner,
            description: guild.description,
            server_id: guild.id,
            name: guild.name
        })
    }
}