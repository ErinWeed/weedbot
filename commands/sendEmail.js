const sendGrid = require('@sendgrid/mail')
require('dotenv').config()
sendGrid.setApiKey(process.env.EMAIL_KEY)

async function sendEmail(args) {
  if (args.length != 4) {
    return 'Please provide the following: recipient name, recipient email, your name, content type (breakup, cheerup, congratulations, and sayhello).'
  }
  let email = args[1]
  if (!email.match(/^\w+@\w+\.\w+$/)) {
    return 'you must provide a valid email address'
  }
  let emailTypes = {
    congratulations: 'd-a8eecdf4e92442aea79114fe34596b96',
    cheerup: 'd-11153ac6104340928c20ea9d5143db89',
    breakup: 'd-78e93bf159654c5a9f333616db239c19',
    sayhello: 'd-ecb2de19995f4c668abdd8ad1c81655c',
  }

  let type = args[3]
  if (!emailTypes.hasOwnProperty(type)) {
    return 'please provide a valid type of email. The options are breakup, cheerup, congratulations, and sayhello.'
  }
  let chosenTemplate = args[3]
  const messageData = {
    to: args[1],
    from: process.env.FROM_EMAIL,
    subject: 'test',
    template_id: emailTypes[chosenTemplate],
    dynamic_template_data: {
      recipient: args[0],
      sender: args[2],
    },
  }
  try {
    await sendGrid.send(messageData)
    return 'email has been sent'
  } catch (error) {
    return 'unable to send email'
  }
}

module.exports = sendEmail
