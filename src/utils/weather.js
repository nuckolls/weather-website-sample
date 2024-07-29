const request   = require('postman-request');

const weatherUrl = 'http://api.weatherstack.com/current?access_key=a2d6db3bba7df4b4f57ed88866546f0d&units=f';

// Weather Request
const weather = ({latitude, longitude, location}, callback) => {
    const url = weatherUrl + '&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined);
        }
        else if (body.error) {
            // Response errors
            callback(body.error.type + ' : ' + body.error.info + ' : ' + body.error.code, undefined);
        }
        else {
            var forecast;
        
            if (body.current.temperature <= 50 ) {
                 // Cold
                 forecast = 'cold';
            }
            else if (body.current.temperature > 50 && body.current.temperature <= 70) {
                // Cool
                forecast = 'cool';
            }
            else if (body.current.temperature > 70 && body.current.temperature <= 90) {
                // Warm
                forecast = 'warm';
            }
            else {
                // Hot
                forecast = 'hot';
            }
        
            callback(undefined, {
                location,
                forecast,
                forecastDesc: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                winddirection: body.current.wind_dir,
                humidity: body.current.humidity
            });
        }
    });
};

module.exports = weather;
