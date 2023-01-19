import { DataTypes } from "sequelize"

export = {
    name: "Members",
    schema: {
        server_id: DataTypes.TEXT,
        user_id: DataTypes.TEXT,
        avatar: DataTypes.TEXT,
        username: DataTypes.STRING,
        xp: DataTypes.INTEGER
    }
}