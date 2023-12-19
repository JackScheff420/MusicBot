const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: {
    name: 'stop',
    description: 'Stop the current player!',
  },
  async execute(interaction) {
    // Hier die Logik für den Stop-Befehl implementieren
    interaction.reply({ content: 'Hey there! Stop command executed.', ephemeral: true });
  },
};