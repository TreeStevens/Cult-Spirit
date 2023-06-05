//deploy-commands.js

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// SECTION 1: Load commands
const commands = [];
const commandsFolder = path.join(__dirname, 'commands');
console.log(`commandsFolder: ${commandsFolder}`);

const commandFolders = fs.readdirSync(commandsFolder);
console.log(`commandFolders: ${commandFolders}`);

for (const folder of commandFolders) {
    const commandsPath = path.join(commandsFolder, folder);
    console.log(`commandsPath: ${commandsPath}`);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    console.log(`commandFiles: ${commandFiles}`);
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        console.log(`Loading command from: ${filePath}`);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            console.log(`Added command: ${command.data.name}`);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// SECTION 2: Initialize REST module
const rest = new REST().setToken(token);

// SECTION 3: Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
