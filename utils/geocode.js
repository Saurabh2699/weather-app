const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=5&access_token=pk.eyJ1Ijoia2hhcGFyZXktMTIzIiwiYSI6ImNrNDA0aDMydTAwMjYzZHBpNDFwNzh2MDIifQ.8DF1sU6QrwmF7l9g7Av76w'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to the weather service. Please check your internet connection...', undefined)
    } else if (response.body.features.length === 0) {
      callback('Cannot find the location. Try again with different location...', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode