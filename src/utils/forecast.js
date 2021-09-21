const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dad44940d36d30600e915c246f7adada&query=' + latitude + ',' + longitude

    request({url, json : true}, (error, {body : data} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (data.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, data.current.weather_descriptions[0] + '. It is currently ' + data.current.temperature + ' degrees out. It feels like ' + data.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast