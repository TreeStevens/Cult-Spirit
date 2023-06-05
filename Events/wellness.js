const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'testwellness',
    description: 'Manually test the wellness check message',
  },
  async execute(interaction) {
    const wellnessCheckChannelId = '998940746918936677';
    const channel = await interaction.client.channels.fetch(wellnessCheckChannelId);

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Spirit Bot",
        url: "https://example.com",
      })
      .setTitle("Daily Wellness Check")
      .setDescription("Share how you're feeling by reacting below.\n\nYour fellow Cultists care.\n\n💙 I'm doing great\n💚 I'm okay\n💛 I'm meh\n💜 Things are tough, I'm struggling \n💔 I'm having a hard time and need someone to talk to")
      .setThumbnail("https://cdn.discordapp.com/attachments/824235590870237214/1097160026893848728/sq-well.png")
      .setColor("#d17015")
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    await interaction.reply('Wellness check message sent!');
  },
};
