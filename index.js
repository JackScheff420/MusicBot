import { config } from 'dotenv';
import { Client, GatewayIntentBits, messageLink } from 'discord.js';

config();

//man braucht die Intents damit Discord bestimmte Dinge an den Bot schickt wie zum Beispiel messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,        
    ],
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.author.username != client.user.username) {
        message.channel.send(`Hallo ${message.author.username}!`);
    }
});
