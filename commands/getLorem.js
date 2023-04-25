require('dotenv').config()
const axios = require('axios')

function isPosInt(x) {
  console.log(x)
  if (isNaN(x)) return false
  parseInt(x)
  if (x <= 0) return false
  return true
}

async function getLorem(args) {
  let numSentances = 3
  if (args.length > 0) {
    if (isPosInt(args[0])) numSentances = args[0]
    else return 'Sentence quantity must be a positive number'
    if (numSentances > 20) {
      return 'Too much lorem requested!'
    }
  }
  let url = `http://hipsum.co/api/?type=hipster-latin&sentences=${numSentances}`
  const config = {
    headers: { 'X-Api-Key': process.env.LOREM_KEY },
  }
  try {
    const response = await axios.get(url)
    return response.data[0]
  } catch (error) {
    return 'No lorem available at this time.'
  }
}

module.exports = getLorem
