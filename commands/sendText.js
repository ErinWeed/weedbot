require('dotenv').config()

const twilio = require('twilio')(process.env.SMS_SID, process.env.SMS_AUTH)

async function sendText(args) {
  let words = ''
  if (args.length < 1) {
    return 'You must pass in a message to send'
  } else {
    words = args.join(' ')
  }
  const message = {
    from: process.env.FROM_PHONE,
    to: process.env.TO_PHONE,
    body: words,
  }
  try {
    await twilio.messages.create(message)
    return 'Text message sent'
  } catch (error) {
    return 'Could not send text message'
  }
}

module.exports = sendText
