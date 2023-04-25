require('dotenv').config()
const path = require('path')

const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice')

async function playMusic(channel, args) {
  if (args.length != 1) {
    return 'You music enter a music type. Your options are calming, techno, jazz, and viola`'
  }
  const userChoice = args[0]
  const choices = {
    calming: {
      file: './music/12 Feed The Birds (Tuppence A Bag).mp3',
      description: "Here's a lovely song for you to enjoy",
    },
    techno: {
      file: './music/1-05 Driving To Heaven (Mat Zo Remix.mp3',
      description: 'This song really takes me back to 2008',
    },
    jazz: {
      file: './music/01 - Take Five.mp3',
      description: 'This song is a favorite among the teens these days',
    },
    viola: {
      file: './music/10 - Capriccio for Solo Viola, Op. 55.mp3',
      description: "Doesn't the viola have a rather haunting quality.",
    },
  }

  if (!choices.hasOwnProperty(userChoice)) {
    return `That option isn't availble. Your music options are calming, techno, jazz, and viola`
  }
  const player = createAudioPlayer()
  const resource = createAudioResource(
    path.join(__dirname, choices[userChoice].file)
  )
  player.play(resource)

  const connection = joinVoiceChannel({
    channelId: process.env.VOICE_CHANNEL_ID,
    guildId: process.env.GUILD_ID,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  })

  connection.subscribe(player)
  return choices[userChoice].description
}

module.exports = playMusic
