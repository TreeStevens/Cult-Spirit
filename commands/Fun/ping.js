const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Stevens is the best and we should listen to him!'),
	async execute(interaction) {
		await interaction.reply('Stevens is the best and we should listen to him!');
	},
};