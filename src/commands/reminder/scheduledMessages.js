const { SlashCommandBuilder } = require('discord.js');
const { getData } = require('../../dataStore.js');
const { getReminderListInfo } = require('../../helperFunctions.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('messages')
    .setDescription('Gets a list of all the user\'s scheduled messages.'),

  async execute(interaction) {
    const reminders = getData().reminders;
    const userId = interaction.user.id;
    const reminderList = [];

    for (const reminder of reminders) {
      if (reminder.user.id === userId) {
        reminderList.push(reminder);
      }
    }

    if (reminderList.length === 0) {
      await interaction.reply({content: `You don't have any scheduled messages!`, ephemeral: true});
    } else {
      await interaction.reply({content: `This is a list of your scheduled messages:\n\n${getReminderListInfo(reminderList)}`,  ephemeral: true});
    }
  },
};