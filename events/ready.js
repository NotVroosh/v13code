const Client = require("../index").Client
const { createCmd } = require("../dataHandler")
Client.on('ready', async () => {
    Client.user.setPresence({ activities: [{ name: "/help", type: "LISTENING"}] })
    console.log(`${Client.user.tag} is online!`)


    createCmd(Client, '877279369830223932')
})