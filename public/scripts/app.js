console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Box
    const txtWeatherLocation = document.getElementById('txtWeather');

    // Output Elements
    const weatherResults = document.getElementById('weatherResults');
    const txtLocation = document.getElementById('txtLocation');
    const txtForecast = document.getElementById('txtForecast');
    const txtTemperature = document.getElementById('txtTemperature');
    const txtFeelsLike = document.getElementById('txtFeelsLike');
    const userMessage = document.getElementById('userMessage');

    fetch('http://localhost:3000/weather?location=' + txtWeatherLocation.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                userMessage.className = 'visible';
                userMessage.innerHTML = data.error;
                weatherResults.className = 'hidden';
            }
            else {
                weatherResults.className = 'visible';
                txtLocation.innerHTML = data.location;
                txtForecast.innerHTML = data.forecast;
                txtForecast.className = data.forecast;
                txtTemperature.innerHTML = data.temperature; 
                txtTemperature.className = data.forecast;
                txtFeelsLike.innerHTML = data.feelslike;
                txtFeelsLike.className = data.forecast;
                userMessage.className = 'hidden';
            }
        });
    });
});
