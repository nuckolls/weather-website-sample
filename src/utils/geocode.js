const request   = require('postman-request');

const geocodeUrl = 'https://api.mapbox.com/search/geocode/v6/forward?limit=1&access_token=pk.eyJ1Ijoic2Vhbi1udWNrb2xscyIsImEiOiJjbHk5M2xuMnIwcXNhMmpvZm90dzZ4OXE5In0.woOmNDISv2PWzY_D2hCKMg';

// Geocode Request
const geocode = (address, callback) => {
    const url = geocodeUrl + '&q=' + encodeURIComponent(address)  + '.json'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the location service!', undefined);
        }
        else if (body.error_code) {
            // Response errors
            callback(body.error_code + ' : ' + body.message, undefined);
        }
        else if (body.features.length === 0) {
            // No results returned
            callback('No results were returned for the given search term!', undefined);
        }
        else {
            // console.log('Location:', body.features[0].properties.full_address);
            // console.log('Latitude:', body.features[0].properties.coordinates.latitude);
            // console.log('Longitude:', body.features[0].properties.coordinates.longitude);

            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address
            });
        }
    });
};

module.exports = geocode;
