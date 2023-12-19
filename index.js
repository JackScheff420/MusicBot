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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        if (commandName === 'play') {
            const playCommand = await import('./commands/play.cjs');
            await playCommand.default.execute(interaction);
        } else if (commandName === 'stop') {
            const stopCommand = await import('./commands/stop.cjs');
            await stopCommand.default.execute(interaction);
        }
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

async function main() {
    const commands = [
        {
            name: 'play',
            description: 'Play a song!',
            options: [
                {
                    name: 'song',
                    type: 3, // Update the type to 3 for STRING
                    description: 'YouTube link of the song to play',
                    required: true,
                },
            ],
        },
        {
            name: 'stop',
            description: 'Stop the current player!',
        },
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