// commands/Fun/war.js (Version 12.0)

// 1. Import required modules
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const { User, Points, Transactions } = require('../../models/associations');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('war')
    .setDescription('Play a game of war.')
    .addIntegerOption(option => option.setName('bet').setDescription('The amount of points you want to bet').setRequired(true)),

  async execute(interaction) {
    // 3. Get user and bet amount
    const user = interaction.user;
    const betAmount = interaction.options.getInteger('bet');

    if (betAmount <= 0) {
      return await interaction.reply({ content: `You must bet at least 1 point!`, ephemeral: true });
    }

    const userRoll = Math.floor(Math.random() * 20) + 1;
    const chesterfieldRoll = Math.floor(Math.random() * 20) + 1;
    let resultMessage = '';

    const embed = new EmbedBuilder();

    // 4. Dice rolling and win conditions
    let amount;
    if (userRoll > chesterfieldRoll) {
      const pointsWon = betAmount;
      amount = betAmount;
      resultMessage = `You rolled ${userRoll}, Chesterfield rolled ${chesterfieldRoll}. You seem to have secured ${pointsWon} points from me. Well done!`;

      embed.setTitle('Diplomacy has failed!')
        .setColor(parseInt('00FF00', 16))
        .setDescription(resultMessage)
        .setThumbnail('https://media.discordapp.net/attachments/1037459635340320918/1098987828643364974/00012-2642075705.png');
    } else if (userRoll < chesterfieldRoll) {
      const pointsLost = betAmount;
      amount = -betAmount;
      resultMessage = `You rolled ${userRoll}, Chesterfield rolled ${chesterfieldRoll}. "Well it seems I am a little richer by.... ${pointsLost} points, is it?  Yes...!`;

      embed.setTitle('Diplomacy has failed!')
        .setColor(parseInt('FF0000', 16))
        .setDescription(resultMessage)
        .setThumbnail('https://media.discordapp.net/attachments/1037459635340320918/1098987828643364974/00012-2642075705.png');
    } else {
      amount = 0;
      resultMessage = `You both rolled ${userRoll}. "We seem to have become deadlocked. I am game to try again!`;

      embed.setTitle('It\'s War!')
        .setColor(parseInt('FFFF00', 16))
        .setDescription(resultMessage)
        .setThumbnail('https://media.discordapp.net/attachments/1037459635340320918/1098987828643364974/00012-2642075705.png');
    }

    // 5: Reply with the result message and create a transaction record
    await interaction.reply({ embeds: [embed] });

    const transactionData = {
      userID: user.id.toString(),
      displayName: user.username,
      categoryId: 'war',
      amount: amount,
      timestamp: new Date(),
    };

    await Transactions.create(transactionData); // Use the create method of the Transactions model
  },
};