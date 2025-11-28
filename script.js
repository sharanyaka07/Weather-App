const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// FIX #1 — Correct selector
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = "your auth token";
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            error404.classList.remove('active');

            if (json.cod === "404") {
                cityHide.textContent = city;
                container.style.height = "500px";
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city) return;

            cityHide.textContent = city;

            container.style.height = "555px";
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':  image.src = "images/sunny.png"; break;
                case 'rain':   image.src = "images/rainy.png"; break;
                case 'snow':   image.src = "images/snow.png"; break;
                case 'clouds': image.src = "images/clodyy.png"; break;
                case 'mist':
                case 'haze':   image.src = "images/mistt.png"; break;
                default:       image.src = "images/clodyy.png"; break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;


            // KEEP ONLY temperature animation clones
            const infoWeather = document.querySelector('.info-weather');
            const elCloneInfoWeather = infoWeather.cloneNode(true);
            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            }, 2200);

            const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const CloneInfoWeatherfirst = CloneInfoWeather[0];

            if (CloneInfoWeatherfirst) {
                CloneInfoWeatherfirst.classList.remove('active-clone');

                setTimeout(() => {
                    CloneInfoWeatherfirst.remove();
                }, 2200);
            }

        });
});
