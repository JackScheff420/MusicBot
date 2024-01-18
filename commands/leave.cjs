// leave.cjs
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      const client = interaction.client;

      // Überprüfen, ob der Bot mit einem Sprachkanal verbunden ist
      if (!client.voice || !client.voice.connections) {
        return interaction.reply('Bot is not currently in a voice channel.');
      }

      // Die Sprachverbindung des Servers abrufen
      const connection = client.voice.connections.get(interaction.guildId);

      if (connection) {
        // Sprachverbindung trennen
        connection.destroy();
        interaction.reply('Bot left the voice channel.');
      } else {
        interaction.reply('Bot is not currently in a voice channel.');
      }
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error during execution. Unable to leave the voice channel.', ephemeral: true });
    }
  },
};
