require('dotenv').config()
const axios = require('axios')

async function getGeoCodebyZip(zipcode) {
  let key = process.env.WEATHER_KEY
  let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${key}`
  try {
    const response = await axios.get(url)
    return [response.data.name, response.data.lat, response.data.lon]
  } catch (error) {
    return 'There was a problem retrieving the latitude and longitude for that zipcode'
  }
}

function validateArgs(args) {
  if (args.length < 1) return `You must include a zipcode!`
  if (args[0].match(/^\d{5}$/)) {
    return 'valid zip'
  }
  return 'Invalid argument, you must include a zipcode'
}

async function getWeather(args) {
  let validation = validateArgs(args)
  if (validation != 'valid zip') {
    return validation
  }
  let key = process.env.WEATHER_KEY
  let [city, lat, lon] = await getGeoCodebyZip(args[0])
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`
  try {
    const response = await axios.get(url)
    const { temp, temp_min, temp_max } = response.data.main
    let weatherBlurb = `Current Weather for ${city}\nConditions: ${response.data.weather[0].description}\nTemperature:\n\tCurrent: ${temp}°F\n\tLow: ${temp_min}°F\n\tHigh: ${temp_max}°F\nClouds: ${response.data.clouds.all}% coverage\nWind: ${response.data.wind.speed} MPH`
    if (response.data.rain) {
      weatherBlurb += `\nRain: ${response.data.rain['1h']} inches in the past hour`
    }
    if (response.data.snow) {
      weatherBlurb += `\nSnow: ${response.data.snow['1h']} inches in the past hour`
    }
    return weatherBlurb
  } catch (error) {
    return 'There was a problem retrieving the weather'
  }
}

module.exports = getWeather
