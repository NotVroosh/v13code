const Client = require("../index").Client
Client.on('interactionCreate', async inter => {
    if(inter.isCommand()) {
        let slashCmds = Client.SlashCmds.get(inter.commandName)
        if(slashCmds) slashCmds.run(inter)
    }
})