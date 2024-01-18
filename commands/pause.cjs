// commands/pause.cjs
const { entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { players } = require('./play.cjs'); // Importiere den globalen Bereich

module.exports = {
  async execute(interaction) {
    try {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const voiceChannel = member.voice.channel;

      if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
      }

      // Zugriff auf den Player im globalen Bereich
      const player = players.get(interaction.guild.id);

      if (!player) {
        return interaction.reply({ content: 'No player found. Unable to pause.', ephemeral: true });
      }

      // Pausiere den Audio-Player
      player.pause();

      interaction.reply({ content: 'Player paused.', ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'An error occurred during execution. Unable to pause the player.', ephemeral: true });
    }
  },
};
