const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState } = require('@discordjs/voice');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      // Überprüfen, ob der Benutzer in einem Voice-Channel ist
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const voiceChannel = member.voice.channel;

      if (!voiceChannel) {
        return interaction.reply({ content: 'You need to be in a voice channel to use this command!', ephemeral: true });
      }

      // Den Bot dem Voice-Channel beitreten lassen
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      // Hier die Logik für den Play-Befehl implementieren, z.B. DisTube.playVoiceChannel(interaction, song);
      interaction.reply({ content: 'Bot connected to your voice channel. Now you can play music!', ephemeral: true });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Error during execution. Unable to connect to the voice channel.', ephemeral: true });
    }
  },
};
