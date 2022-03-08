const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    message.channel.send('Pong!');
}

module.exports.help = {
    name: 'ping',
    aliases: ['test', 'hello'],
}