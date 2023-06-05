// commands/utility/creep.js
// Displays a user's lifetime points and monthly points in an embed

// 1. Import required modules
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js'); // changed to EmbedBuilder
const path = require('path');

// 2. Import required models
const Users = require(path.join(__dirname, '..', '..', 'models', 'users.js'));
const Points = require(path.join(__dirname, '..', '..', 'models', 'Points.js'));

// 3. Export slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('creep')
        .setDescription('Displays a user\'s lifetime points and monthly points.')
        .addUserOption(option => option.setName('target').setDescription('The user you want to creep on').setRequired(true)),
    async execute(interaction) {
        try {
            // 4. Get the target user
            const targetUser = await Users.findOne({ where: { userID: interaction.options.getUser('target').id } });

            // 4.1 Check if the target user is found
            if (!targetUser) {
                return await interaction.reply('This user is not in the database.');
            }

            // 5. Find the user's display name, lifetime points, and monthly points
            const userPoints = await Points.findOne({ 
                where: { userId: targetUser.userID }, 
                attributes: ['displayName', 'totalPoints', 'monthlyPoints'],
                raw: true,
            });

            // 5.1 Check if userPoints is found
            if (!userPoints) {
                return await interaction.reply('User points not found in the database.');
            }

            // 6. Create the embed
            const embed = new EmbedBuilder() // changed to EmbedBuilder
                .setColor(0xFFFFFF)
                .setTitle('Creeper!')
                .setDescription(`${userPoints.displayName} has been a Cultist since ${new Date(targetUser.joinDate).toDateString()}.\n${userPoints.totalPoints} Lifetime Points\n${userPoints.monthlyPoints} Monthly Points`);

            // 7. Reply with the embed
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occurred while executing the command.');
        }
    }
};
