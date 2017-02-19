const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: "Address Input",
      //how Yargs should parse
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;


axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to Find Address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/f894bd710b4eb1ccf703ed4670287581/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var actualTemperature = response.data.currently.apparentTemperature;
  console.log(`Currently: ${temperature}; Actually: ${actualTemperature}`);
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Unable to Connect to API Server');
  } else {
    console.log(err.message);
  }
});