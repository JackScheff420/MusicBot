const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    name: 'play',
    description: 'Play a song!',
  },
  async execute(interaction) {
    // Hier die Logik für den Play-Befehl implementieren
    interaction.reply({ content: 'Hey there! Play command executed.', ephemeral: true });
  },
};