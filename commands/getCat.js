const axios = require('axios')

async function getCat() {
  let url = 'https://api.thecatapi.com/v1/images/search'
  try {
    const response = await axios.get(url)
    return response.data[0].url
  } catch (error) {
    console.log(error)
    return 'There was a problem retrieving a cat'
  }
}

module.exports = getCat
