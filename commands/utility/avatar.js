// avatar.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of the user who executed the command'),

    async execute(interaction) {
        const user = interaction.user;
        const avatarURL = user.displayAvatarURL({ dynamic: true });

        await interaction.reply({ content: `Here's your avatar: ${avatarURL}` });
    }
};
