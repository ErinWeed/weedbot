const axios = require('axios')
const convert = require('xml-js')

function validateArgs(args) {
  if (args.length < 1)
    return [
      'error',
      'You must include one of the following counties in your request: Salt Lake, Box Elder, Carbon, Davis, Duchesne, Iron, Tooele, Uintah, Washington',
    ]
  let county = args.join('').toLowerCase()
  console.log(county)
  const counties = {
    saltlake: 'slc',
    boxelder: 'boxelder',
    carbon: 'p2',
    davis: 'bv',
    duchesne: 'rs',
    iron: 'en',
    tooele: 'tooele',
    uintah: 'v4',
    washington: 'washington',
  }
  if (counties.hasOwnProperty(county)) {
    return ['success', counties[county]]
  }
  return [
    'error',
    'Invalid county entered. Available counties are: Salt Lake, Box Elder, Carbon, Davis, Duchesne, Iron, Tooele, Uintah, Washington',
  ]
}

async function getAir(msg, args) {
  let validation = validateArgs(args)
  if (validation[0] == 'error') {
    return validation[1]
  }
  let url = `https://air.utah.gov/rssFeed.php?id=${validation[1]}`

  try {
    const response = await axios.get(url)
    const xml = response.data

    const converted = convert.xml2js(xml, { compact: true })
    let forcasts = converted.rss.channel.item
    let forcastStatement = ''
    for (let forcast of forcasts) {
      forcastStatement += `${
        forcast.title._text
      }\n  ${forcast.description._text.trim()}\n\n`
    }

    return forcastStatement
  } catch (error) {
    console.log(error)
    return 'There was a problem retrieving air quality'
  }
}

module.exports = getAir
