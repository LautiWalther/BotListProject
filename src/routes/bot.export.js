const config = require('../Utils/config');

const Discord = require("discord.js");

const client = new Discord.Client({ intents: 32767 });

client.on('ready', () => {
    console.log(`${client.user.tag} is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);
    client.user.setPresence({
        activity: {
            name: 'List Bot'
        },
        status: 'online'
    });
});

client.login(config.token);

exports = module.exports = client;