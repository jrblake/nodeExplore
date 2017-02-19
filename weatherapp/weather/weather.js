//f894bd710b4eb1ccf703ed4670287581
//https://api.darksky.net/forecast/f894bd710b4eb1ccf703ed4670287581/39.9443953,-75.16317769999999

const request = require('request');


var getWeather = (lat, lng, callback) => {
  request ({
    url:`https://api.darksky.net/forecast/f894bd710b4eb1ccf703ed4670287581/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        apparentTemperature: body.currently.apparentTemperature,
        temperature: body.currently.temperature
      });
    } else {
      callback('Unable to Fetch Weather');
    }
  });
};

module.exports.getWeather = getWeather;