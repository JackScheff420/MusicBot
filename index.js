import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { DisTube } from 'distube';

config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

//man braucht die Intents damit Discord bestimmte Dinge an den Bot schickt wie zum Beispiel messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ],
});

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
})

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.commandName == 'play') {
        interaction.reply({ content: 'Hey there!!' + interaction.options });

    }
    if (interaction.commandName == 'stop') {
        interaction.reply({ content: 'stopping!!' + interaction.options });

    }
})

async function main() {
    const commands = [
        {
            name: 'play',
            description: 'play a song!'
        },
        {
            name: 'stop',
            description: 'stop the current player!'
        }
    ];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) { 
        console.log(err);
    }
}

main();