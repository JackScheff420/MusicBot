// play.cjs
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { MessageActionRow, MessageButton } = require('discord.js');

// Globaler Bereich, um den Player zu speichern
const players = new Map();

module.exports = {
  async execute(interaction) {
    try {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const voiceChannel = member.voice.channel;

      if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
      }

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      // Speichern des Players im globalen Bereich
      const player = createAudioPlayer();
      players.set(interaction.guild.id, player);

      const song = interaction.options.getString('song');
      const stream = ytdl(song, { filter: 'audioonly' });
      const resource = createAudioResource(stream);

      player.play(resource);
      entersState(player, 'Playing');

      connection.subscribe(player);

      interaction.reply({ content: `Now playing: ${song}`, ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error during execution. Unable to play the specified song.', ephemeral: true });
    }
  },
};

// Exportiere den globalen Bereich, um auf den Player in anderen Dateien zuzugreifen
module.exports.players = players;
