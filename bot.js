const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { Client } = Discord;

const client = new Client();

const PREFIX = '!'; // Hier kannst du das Präfix für Bot-Befehle festlegen

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.substring(PREFIX.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Du musst in einem Sprachkanal sein, um Musik abzuspielen.');

    const connection = await voiceChannel.join();

    const url = args[0];
    if (!url) return message.channel.send('Du musst eine YouTube-URL angeben.');

    const stream = ytdl(url, { filter: 'audioonly' });
    const dispatcher = connection.play(stream);

    dispatcher.on('finish', () => {
      voiceChannel.leave();
    });
  }
});

const TOKEN = 'MTEzODUyODE2OTk0NzgyNDIwMA.Ge3Ihq.3WrLGkonsXGTO8bO3Rdfdz4Y9WxooqjABg6aJ0'; // Hier deinen Bot-Token einfügen
client.login(TOKEN);
