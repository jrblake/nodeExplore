const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    //specify unique aspects of request
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    //tells Request that it should parse the response form JSON to JSobject
    json: true
  }, (error, response, body) => {
    //callback function executed when JSON is received from API
    //stringify takes 3 arguments (object, filtering function, and #ofspaces)
    if (error) {
      callback('Unable to Connect to Google Servers');
    } else if (body.status === "ZERO_RESULTS") {
      callback('Unable to Find that Address');
    } else if (body.status === "OK") {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });

};

module.exports = {
  geocodeAddress
};