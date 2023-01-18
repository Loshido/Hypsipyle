import { Events, SlashCommandBuilder, CommandInteraction, Collection } from "discord.js"


import fs from "node:fs"
import path from "node:path"


const commands = new Collection()

const commandsPath = path.join(__dirname, '../commands')
const commandFiles = fs.readdirSync(commandsPath)

interface CommandFile {
    data: SlashCommandBuilder,
    execute(interaction: CommandInteraction): void
}

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command: CommandFile | any = require(filePath)
    
    if ('data' in command && 'execute' in command || !command.disabled) commands.set(command.data.name, command);
}

export = {
    name: Events.InteractionCreate,
    async execute(interaction: CommandInteraction) {
        if(!interaction.isChatInputCommand()) return

        const InteractionCommand: CommandFile | any = await commands.get(interaction.commandName)
    
        if(!InteractionCommand){
            console.error(`No command matching ${interaction.commandName} was found.`)
            return;
        }
    
        try {
            await InteractionCommand.execute(interaction);
        } catch (err) {
            console.error(err)
            await interaction.reply({ content: "Une erreur est parvenue lors de l'éxecution de cette commande", ephemeral: true })
        }
    }
}