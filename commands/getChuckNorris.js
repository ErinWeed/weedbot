const fetch = require('node-fetch')

async function getChuckNorrisJoke() {
  let url = 'https://api.chucknorris.io/jokes/random'
  try {
    const response = await fetch(url, {
      method: 'GET',
    })
    const data = await response.json()

    return data.value
  } catch (error) {
    return "I'm not feeling funny today"
  }
}

module.exports = getChuckNorrisJoke
