require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

function pong() {
  return "pong";
}

async function usage() {
  const help = fs.readFileSync("./help.txt", "utf-8");
  return help;
}

async function getGeoCodebyZip(zipcode) {
  console.log("getting geo codes");
  let key = "f525e526dcdfe1881f636bf1cfab57b8";
  let url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${"US"}&appid=${key}`;
  try {
    const response = await axios.get(url);
    return [response.data.name, response.data.lat, response.data.lon];
  } catch (error) {
    console.log(error);
    return "There was a problem retrieving the latitude and longitude for that zipcode";
  }
}

async function getWeather() {
  let key = "f525e526dcdfe1881f636bf1cfab57b8";
  let [city, lat, lon] = await getGeoCodebyZip("84102");
  console.log(city, lat, lon);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    const { temp, temp_min, temp_max } = response.data.main;
    let weatherTable = `The weather in ${city} is ${response.data.weather[0].description} today.\n
    Current temperature: ${temp} F\n
    Temperature range: ${temp_min} - ${temp_max} F\n
    Clouds: ${response.data.clouds.all}% coverage\n
    Wind: ${response.data.wind.speed} MPH`;

    return weatherTable;
  } catch (error) {
    console.log(error);
    return "There was a problem retrieving the weather";
  }
}

async function getCat() {
  let url = "https://api.thecatapi.com/v1/images/search";
  try {
    const response = await axios.get(url);
    console.log(response.data[0].url);
    return response.data[0].url;
  } catch (error) {
    console.log(error);
    return "There was a problem retrieving a cat";
  }
}

async function getLorem() {
  let url = "https://api.api-ninjas.com/v1/loremipsum?sentences=1";
  const config = {
    headers: { "X-Api-Key": "Jv1cj7spiHcUaa7jAJD/CQ==Ck2jxjcG391Mhy1v" },
  };
  try {
    const response = await axios.get(url, config);
    console.log(response.data.text);
    return response.data.text;
  } catch (error) {
    console.log(error);
    return "No lorem available at this time.";
  }
}

async function getDadJoke() {
  let url = "https://icanhazdadjoke.com/";
  const config = {
    headers: { Accept: "application/json" },
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: config.headers,
    });
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.log(error.response.status);
    return "I'm not feeling funny today";
  }
}

async function getChuckNorrisJoke() {
  let url = "https://api.chucknorris.io/jokes/random";
  const config = {
    headers: { Accept: "application/json" },
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      // ,
      // headers: config.headers,
    });
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.log(error.response.status);
    return "I'm not feeling funny today";
  }
}

const commands = {
  ping: pong,
  "!help": usage,
  "!lorem": getLorem,
  "!cat": getCat,
  "!dadjoke": getDadJoke,
  "!chuck": getChuckNorrisJoke,
  "!die": () => "kills your bot) (5 pts",
  "!text": () => "sends a text message to someones phone",
  "!email": () => "sends email",
  "!music": () => "streams music remotely",
  "!weather": getWeather,
};

client.on("ready", (bot) => {
  console.log(`the bot, ${bot.user.tag} is online.`);
});
client.on("messageCreate", async (msg) => {
  if (commands.hasOwnProperty(msg)) {
    console.log("found it");
    try {
      msg.reply(await commands[msg]());
    } catch {
      msg.reply("oops, I messed up");
    }
  }
});

client.login(process.env.TOKEN);
