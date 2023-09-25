require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js')
const fs = require('fs')
const getCat = require('../commands/getCat')
const getLorem = require('../commands/getLorem')
const getWeather = require('../commands/getWeather')
const getDadJoke = require('../commands/getDadJoke')
const getChuckNorrisJoke = require('../commands/getChuckNorris')
const sendEmail = require('../commands/sendEmail')
const sendText = require('../commands/sendText')
const getAir = require('../commands/getAir')
const playMusic = require('../commands/playMusic')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
})

async function usage() {
  const help = fs.readFileSync('./help.txt', 'utf-8')
  return help
}

async function kill(channel) {
  await channel.send('Shutting down bot...')
  client.destroy()
  process.exit(0)
}

const commands = {
  '!help': usage,
  '!lorem': (msg, args) => getLorem(args),
  '!cat': getCat,
  '!dadjoke': getDadJoke,
  '!chuck': getChuckNorrisJoke,
  '!die': (msg, args) => kill(msg.channel),
  '!text': (msg, args) => sendText(args),
  '!email': (msg, args) => sendEmail(args),
  '!music': (msg, args) => playMusic(msg.channel, args),
  '!weather': (msg, args) => getWeather(args),
  '!air': getAir,
}

client.on('ready', (bot) => {
  console.log(`the bot, ${bot.user.tag} is online.`)
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'add') {
      const num1 = interaction.options.get('first-number').value
      const num2 = interaction.options.get('second-number').value
      interaction.reply(`${num1 + num2}`)
    }
    if (interaction.commandName === 'email') {
      let args = []
      args.push(interaction.options.get('recipient-name').value)
      args.push(interaction.options.get('recipient-email').value)
      args.push(interaction.options.get('sender-name').value)
      args.push(interaction.options.get('content-type').value)
      interaction.reply(await sendEmail(args))
    }
  }
})

client.on('messageCreate', async (msg) => {
  if (!msg.content.startsWith('!')) return
  const args = msg.content.split(' ')
  let command = args.shift()
  if (commands.hasOwnProperty(command)) {
    try {
      msg.reply(await commands[command](msg, args))
    } catch {
      msg.reply('oops, I messed up')
    }
  }
})

client.login(process.env.TOKEN)
