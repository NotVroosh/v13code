async function createCmd(Client, guildId) {
    const data = [

        // echo slash cmd
        {
            name: 'echo',
            description: 'Echo your text!',
            options: [{
                name: 'text',
                type: 'STRING',
                description: 'The input to echo back',
                required: true,
            }],
        },


    ]


    await Client.guilds.cache.get(guildId)?.commands.set(data);
}



module.exports = { createCmd }