console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Input Box
    const txtWeatherLocation = document.getElementById('txtWeather');

    // Output Elements
    const weatherResults    = document.getElementById('weatherResults');
    const txtLocation       = document.getElementById('txtLocation');
    const txtForecast       = document.getElementById('txtForecast');
    const txtTemperature    = document.getElementById('txtTemperature');
    const txtFeelsLike      = document.getElementById('txtFeelsLike');
    const txtHumidity       = document.getElementById('txtHumidity');
    const txtWindDirection  = document.getElementById('txtWindDirection');
    const txtWindSpeed      = document.getElementById('txtWindSpeed');
    const userMessage       = document.getElementById('userMessage');

    fetch('/weather?location=' + txtWeatherLocation.value).then((response) => {
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
                txtHumidity.innerHTML = data.humidity;
                txtHumidity.className = data.forecast;

                switch(data.winddirection) {
                    case "N":
                        txtWindDirection.innerHTML = "North";
                        break;

                    case "S":
                        txtWindDirection.innerHTML = "South";
                        break;

                    case "E":
                        txtWindDirection.innerHTML = "East";
                        break;

                    case "W":
                        txtWindDirection.innerHTML = "West";
                        break;
                }

                txtWindDirection.className = data.forecast;
                txtWindSpeed.innerHTML = data.windspeed;
                txtWindSpeed.className = data.forecast;
                userMessage.className = 'hidden';
            }
        });
    });
});
