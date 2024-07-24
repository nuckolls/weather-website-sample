const express   = require('express');
const path      = require('path');
const hbs       = require('hbs');
const geocode   = require('./utils/geocode');
const weather   = require('./utils/weather');

const app   = express();
const port  = process.env.PORT || 3000;

// Define paths for Express config
const publicPath    = path.join(__dirname,'../public');
const viewsPath     = path.join(__dirname, '../templates/views'); // Default name would be 'views'
const partialsPath  = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// Establish web server routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sean Nuckolls'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sean Nuckolls'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sean Nuckolls',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.location)
    {
        return res.send({
            error: 'You must provide a location'
        });
    }

    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({
                error
            });
        }
    
        weather(data, (error, {location, forecast, forecastDesc, temperature, feelslike} = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
    
            res.send({
                location,
                forecast,
                forecastDesc,
                temperature,
                feelslike
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorTitle: 'Article not found',
        errorMessage: 'We\'re sorry, we couldn\'t find the help article you were looking for on our site.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorTitle: 'Oops...Something went wrong!',
        errorMessage: 'We couldn\'t find the page you were looking for on our site. Please use the navigation bar to see what is available.'
    });
});

// Start web server
app.listen(port, () => {
    console.log('Server is running on port', port);
});
