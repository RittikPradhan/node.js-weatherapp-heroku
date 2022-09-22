const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=d02ee64d92fbfeb2322759d30cc20753&query=" + latitude + "," + longitude;

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to weather service!", undefined);
        }
        else if(body.error) {
            callback("Unable to find location!", undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + 
                ". It is currently " + body.current.temperature + 
                    " degrees out. It feels like " + body.current.feelslike +
                        " degrees out. The Humidity is " + body.current.humidity + "%."
            );
        }
    })
}

module.exports = forecast;