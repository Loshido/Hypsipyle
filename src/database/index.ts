import { Sequelize } from "sequelize"
import fs from "node:fs"
import path from "node:path"
import { config } from "dotenv"
config()

const db_connection: string | any = process.env.DB_CONNECTION
const sequelize = new Sequelize(db_connection)

interface DatabaseModel {
    name: string,
    schema: unknown
}

const Models = []
const ModelsPath = path.join(__dirname, "models")
const ModelsFilesPath: string[] = fs.readdirSync(ModelsPath)

for(const ModelPath of ModelsFilesPath) {
    const model_path = path.join(ModelsPath, ModelPath)
    const model: DatabaseModel | any = require(model_path)
    Models.push(model)
}

export = { sequelize, Models }
