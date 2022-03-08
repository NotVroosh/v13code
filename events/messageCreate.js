const Client = require("../index").Client
Client.on('messageCreate', async message => {
    if(message.author.bot || message.channel.type == 'DM') return

    let prefix = '!'
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)


    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
    if(commands) {
        if(!message.content.startsWith(prefix)) return
        commands.run(Client, message, args, prefix);
    } 
})