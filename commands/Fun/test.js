const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('This is the test command'),

    async execute(interaction) {
        console.log(`Command received: /${interaction.commandName}`);
        const response = 'The Spirit is with us!';
        console.log(`Response sent: ${response}`);
        await interaction.reply({ content: response });
    }
}
