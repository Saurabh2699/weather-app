const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/1fa5fbc0635e5f02b42de3d00cf62129/' + latitude + ',' + longitude + '?units=si'

  request({ url: url, json: true }, (error, response) => {
    const temp = response.body.currently.temperature
    const rain = response.body.currently.precipProbability
    const today = response.body.daily.data[0].summary

    if (error) {
      callback('Unable to connect to the weather service. Please check your internet connection...', undefined)
    } else if (response.body.error) {
      callback('Cannot find the location. Check out the coordinates once again...', undefined)
    } else {
      callback(undefined, `${today} There is currently ${temp} degrees out. There is ${rain}% chances of rain.`)
    }
  })
}

module.exports = forecast