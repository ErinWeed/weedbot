const fetch = require('node-fetch')

async function getDadJoke() {
  let url = 'https://icanhazdadjoke.com/'
  const config = {
    headers: { Accept: 'application/json' },
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: config.headers,
    })
    const data = await response.json()
    return data.joke
  } catch (error) {
    return "I'm not feeling funny today"
  }
}

module.exports = getDadJoke
