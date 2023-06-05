// commands/utility/awaken.js
// Awakens a user and adds them to the database.

// IMPORTANT: When editing, only give the entire numbered section that needs to be replaced. As in: replace section 5 with X

// Section 0: Header Information
// -----------------------------
// Table names used in this file:
// - Users:         [Users]
// - Points:        [Points]
// - MonthlyPoints: [MonthlyPoints]
// - Transactions:  [Transactions]
//
// Models used in this file:
// - Users model:         [/models/users.js]
// - Points model:        [/models/Points.js]
// - Transactions model:  [/models/transactions.js]
//
// IMPORTANT: When executing transactions, the 'transaction.created' Sequelize hook is triggered,
// which updates the corresponding rows in the 'Points' and 'MonthlyPoints' tables. Therefore, there's no need to manually
// update these tables after creating a transaction.
// -----------------------------


// 1. Import required modules
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const path = require('path');
const { format } = require('date-fns');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const { EmbedBuilder } = require('discord.js');

console.log(chalk.yellowBright('Loading awaken.js'));

// 2. Import required internal models

const Points = require('../../models/Points');
const { bg } = require('date-fns/locale');
const Transactions = require(path.join(__dirname, '..', '..', 'models', 'transactions.js'));
const Users = require(path.join(__dirname, '..', '..', 'models', 'users.js'));

// 3. Export slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName('awaken')
        .setDescription('Awakens a user and adds them to the database.')
        .addUserOption(option => option.setName('user').setDescription('The user to awaken').setRequired(true)),
    async execute(interaction) {

        // 3.1 Define staff role ID
        const staffRoleId = '842835839389663293'; // Staff Role ID

        // 3.2 Get user to awaken
        const userToAwaken = interaction.options.getUser('user');

        // 3.3 Check if user is staff
        if (!interaction.member.roles.cache.some(role => role.id === staffRoleId)) {
            return await interaction.reply({ content: 'You do not have the required role to use this command.', ephemeral: true });
        }

        try {
            console.log(chalk.blueBright('Adding User'));

            // 3.4 Check if user is already in the database
            const foundUser = await Users.findOne({
                where: { userID: userToAwaken.id },
            });

            let newUser;  // Declare newUser outside the if block so it can be accessed later

            // 3.5 Add user to the Users table if they are not found
            if (!foundUser) {
                console.log(chalk.blueBright('Adding User to Users table'));
                newUser = await Users.create({
                    displayName: userToAwaken.username,
                    joinDate: format(userToAwaken.createdAt, 'MM/dd/yyyy'),
                    userID: userToAwaken.id, // Use userID as the primary key
                });
                console.log(chalk.red('userID:'), chalk.white(newUser.userID));
                console.log(chalk.red('displayName:'), chalk.white(newUser.displayName));
                console.log(chalk.red('joinDate:'), chalk.white(newUser.joinDate));
                console.log(chalk.green('Complete newUser object:'), newUser);
            } else {
                console.log(chalk.red('User already exists in the database.'));
                await interaction.reply({ content: 'That user has already been awakened!', ephemeral: true });
            }

            try {

                // 3.7 Reply with user's information, tagging the user
                if (!foundUser) {
                    const embed = new EmbedBuilder()
                        .setTitle('AWAKE!')
                        .setColor(0x0099FF)
                        .setDescription(`The spirit of <@${userToAwaken.id}> has been awakened!`)
                        .addFields(
                            { name: 'Name', value: newUser.displayName },
                            { name: 'Devotion Day', value: format(new Date(newUser.joinDate), 'MM/dd/yyyy') }
                        )
                        .setFooter({ text: 'They have been gifted 100 Spirit Points!' });
                    await interaction.reply({ embeds: [embed] });
                }

                // 3.8 Log a double line of asterisks to indicate the end of the log
                console.log(chalk.yellowBright('\n*********************************************\n'));
            } catch (error) {
                console.error('Error adding initial transaction:', error);
                console.error('Error executing awaken:', error);
                await interaction.reply({ content: 'An error occurred while trying to awaken the user.' });
            };
        } catch (error) {
            console.error('Error adding user or initial transaction:', error);
            await interaction.reply({ content: 'An error occurred while trying to awaken the user.', ephemeral: true });
            return;
        }

    }
};