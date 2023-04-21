require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js')

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMembers,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent
  ]
})

client.on('ready', (bot)=>{
  console.log(`the bot, ${bot.user.tag} is online.`)
})
client.on('messageCreate', (msg)=>{
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
})

client.login(process.env.TOKEN)
