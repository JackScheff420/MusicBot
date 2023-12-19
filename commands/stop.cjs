const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      const client = interaction.client;
      const queue = client.DisTube.getQueue(interaction.guildId);

      if (queue) {
        client.DisTube.stop(interaction.guildId);
        interaction.reply('Playback stopped!');
      } else {
        interaction.reply('There is nothing to stop.');
      }
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error during execution. Unable to stop playback.', ephemeral: true });
    }
  },
};
