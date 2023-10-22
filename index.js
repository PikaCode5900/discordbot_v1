const dotenv = require('dotenv')
dotenv.config()
// Discord bot
// require('dotenv').config()

const {DISCORD_TOKEN, CLIENT_ID} = require('./config') // ./config.js

const colors = require('colors')
const {Client, GatewayIntentBits} = require('discord.js')
// const client = new Client({intents: 32767})
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
    ]
})

// agregar frases inspiradoras al Bot
function getQuote() {
    return fetch("https://zenquotes.io/api/random")
      .then(res => {
        return res.json()
        })
      .then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
      })
  }

client.once('ready', () => {
    // console.log(client.user.tag)
    console.log(`Bot ${client.user.tag} esta encendido!`.blue)
    console.log(`Conectado como ${client.user.tag}!`)
    // console.log(`Bot ${client.user.username} correcto`.blue)

    console.log(client.user.presence)
    client.user.setStatus('online')
    console.log('status: ' + client.user.presence.status)
    console.log('\n')

    // const testChannel = client.channels.cache
    // console.log(testChannel.find(channel => channel.name == 'test'))
    // console.log(testChannel)

    // Vamos a añadir el primer comando a nuestro bot
    client.application.commands.set([
        {
            name: "ping",
            description: "Pong!",
            option: []
        },
    ]);

})

// Ahora falta hacer una acción cuando se ejecute el comando en el servidor /ping
client.on('interactionCreate', async inter => {
    if(inter.isCommand() && inter.commandName === 'ping') {
        await inter.reply('Pong! 🏓')
    }
});

client.on("messageCreate", async (msg) => {
    console.log(msg.author.username)
    console.log(msg.content)

    if(msg.author.bot) return

    if (msg.content === 'ping'){
        await msg.reply('Pong!🏓')
    }

    listaSALUDOS = ['hola', 'Hola', 'Saludos', 'saludos']
    if (listaSALUDOS.includes(msg.content)){
        // await msg.channel.send('Hola patatilla!')
        await msg.channel.send(`Hola ${msg.author}!`)
    }

    if (msg.content === '!test') {
        await msg.channel.send(`Me gusta verte testear señor ${msg.author}!`)
    }

    if (msg.content === '!social') {
        await msg.channel.send('http://google.com')
        await msg.channel.send('https://instagram.com/')
        await msg.channel.send('http://reddit.com')
    }

    // Función no estés triste
    if (msg.content === "!inspire") {
        getQuote().then(quote => msg.channel.send(quote))
    }

    let sadWords  = ["sad", "depressed", "unhappy", "angry", "miserable"]
    if(sadWords .includes(msg.content)) {
        msg.delete()
        getQuote().then(quote => msg.channel.send(quote))
    }else{
        console.log('No hay palabras sad, todo felis')
    }

    let argumentos = msg.content.split(' ')

    if (argumentos[0] === '!decir'){
        msg.reply(argumentos.slice(1).join(' '))
    }

    if(msg.content == msg.content.toUpperCase()){
        await msg.channel.send(`Por favor no grite Sr.${msg.author}!`)
    }

    if(msg.content === 'pretty') {
        msg.delete()
        msg.channel.send('Bonico')
    }

    let listaSSS = ['tonto', 'caraculo', 'palurdo']
    if(listaSSS.includes(msg.content)) {
        msg.delete()
        msg.channel.send('🤫')
    }else{
        console.log('No hay insultos, todo correcto wacho')
    }

    // client.on('interactionCreate', async inter => )

});

client.login(DISCORD_TOKEN) // del ./config.js
// console.log('CLIENT_ID: ', CLIENT_ID)

