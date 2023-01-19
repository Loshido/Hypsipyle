import { DataTypes } from "sequelize"

export = {
    name: "Servers",
    schema: {
        avatar: DataTypes.TEXT,
        description: DataTypes.TEXT,
        server_id: DataTypes.TEXT,
        name: DataTypes.STRING
    }
}