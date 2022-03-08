const discord = require('discord.js')
const { token } = require('./config.json')
const fs = require('fs')
const Client = new discord.Client({
    intents: [ discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MEMBERS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.DIRECT_MESSAGES ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true } 
})

Client.commands = new discord.Collection();
Client.aliases = new discord.Collection();
Client.events = new discord.Collection();
Client.SlashCmds = new discord.Collection();
module.exports.Client = Client

// Command Handler & Aliases
fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log("[COMMANDS HANDLER] - Can't find any commands!");

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`[COMMANDS HANDLER] - File ${file} was loaded`)

            try {
                Client.commands.set(fileGet.help.name, fileGet);

                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


// Event Handler
fs.readdirSync('./events/').forEach(file => {
    var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return console.log("[EVENTS HANDLER] - Can't find any events!");
    let check = false
    jsFiles.forEach(event => {
        const eventGet = require(`./events/${event}`)
        try {
            Client.events.set(eventGet.name, eventGet)
            if(check == false) {
                console.log(`[EVENTS HANDLER] - File ${event} was loaded`)
                check = true
            }
        } catch(error) {
            return console.log(error)
        }
    });
});


// Slash commands handler
fs.readdirSync('./SlashCommands/').forEach(dir => {
    fs.readdir(`./SlashCommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log("[SLASH CMD HANDLER] - Can't find any commands!");

        jsFiles.forEach(file => {
            var fileGet = require(`./SlashCommands/${dir}/${file}`);
            console.log(`[SLASH CMD HANDLER] - File ${file} was loaded`)

            try {
                Client.SlashCmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

require('dotenv').config();
Client.login(process.env.TOKEN);