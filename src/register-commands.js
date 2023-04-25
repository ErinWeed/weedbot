const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
require('dotenv').config()

const commands = [
  {
    name: 'add',
    description: 'adds two numbers together',
    options: [
      {
        name: 'first-number',
        description: 'The first number',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: 'second-number',
        description: 'The second number',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: 'email',
    description: 'sends an email',
    required: true,
    options: [
      {
        name: `recipient-name`,
        description: "The name of the person you'd like to send an email.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'recipient-email',
        description: "The recipicent's email address.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'sender-name',
        description: "The sender's name.",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'content-type',
        description: `Choose the type of email you'd like to send`,
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          {
            name: 'Congratulations!',
            value: 'congratulations',
          },
          {
            name: 'Cheer up!',
            value: 'sympathy',
          },
          {
            name: 'Say hello',
            value: 'sayhello',
          },
          {
            name: 'Break-up',
            value: 'breakup',
          },
        ],
      },
    ],
  },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
async function registerCommands() {
  try {
    console.log('registering commands')
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    )
    console.log('slash commands were registered')
  } catch (error) {
    console.log(`error with registering commands ${error}`)
  }
}

registerCommands()
