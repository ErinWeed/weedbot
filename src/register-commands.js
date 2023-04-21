const {REST, Routes} = require('discord.js')
require('dotenv').config()
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env

const commands = [
  {name: 'pong',
description: 'replies with pong',}
]

const rest = new REST({version: 10}).setToken(TOKEN)

async function commandFunction() {
  try{
    console.log('registering slash commands...')
    await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    {body: commands}
    )
    console.log('slash commands were registered')
  }
  catch(error){console.log(`There was an error: ${error}`)}
}
commandFunction()