import { Events, Message, bold } from "discord.js";
import { Sequelize } from "sequelize"
export = {
    name: Events.MessageCreate,
    database: true,
    async execute(sequelize: Sequelize, msg: Message) {
        if(msg.author.bot) return

        const [, created] = await sequelize.models.Members.findOrCreate({
            where: {
                user_id: msg.author.id,
                server_id: msg.guildId
            },
            defaults: {
                user_id: msg.author.id,
                server_id: msg.guildId,
                avatar: msg.author.avatar,
                username: msg.author.username,
                xp: 0
            }
        })

        if(!created) msg.react("🕵️‍♂️")
    }
}