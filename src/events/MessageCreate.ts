import { Events, Message } from "discord.js";
import { Sequelize } from "sequelize"
import cache from "../CacheInstance"

interface Member {
    server_id: string,
    user_id: string,
    avatar: string,
    username: string,
    xp: string,
    updatedAt?: number,
    createdAt?: number
}

export = {
    name: Events.MessageCreate,
    database: true,
    async execute(sequelize: Sequelize, msg: Message) {
        if(msg.author.bot) return

        const M = sequelize.models.Members
        const condition = {
            user_id: msg.author.id,
            server_id: msg.guildId
        }
        
        const CacheKey = msg.guildId + "/" + msg.author.id + "/xp"
        if(cache.has(CacheKey)) {
            const data: string | undefined = cache.get(CacheKey)
            const lastUpdated = new Date(data || Date.now())
            const elapsed = (Date.now() - lastUpdated.getTime()) / 1000 / 60
            if(elapsed >= 4) {
                const member = await M.findOne({ where: condition })
                if(!member) return
                const affected = await M.update({
                    xp: parseInt(member.dataValues.xp) + 1
                }, { where: condition })
                if(affected) await msg.react("🕵️‍♂️")
            }
        } else {
            const [member] = await M.findOrCreate({
                where: condition,
                defaults: {
                    user_id: msg.author.id,
                    server_id: msg.guildId,
                    avatar: msg.author.avatar,
                    username: msg.author.username,
                    xp: 0
                }
            })

            cache.set(CacheKey, member.dataValues.updatedAt)
        }
    }
}