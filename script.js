document.addEventListener("DOMContentLoaded", function() {
    let allCountries;

    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            allCountries = data;
        })
        .catch(error => console.error("Error fetching country data:", error));

    function displayCountries(countries) {
        const countryContainer = document.getElementById("countryContainer");
        countryContainer.style.display = "block";

        countries.forEach(country => {
            const countryCard = document.createElement("div");
            countryCard.className = "col-md-4 country-card";

            countryCard.innerHTML = `
                <h4>${country.name.common}</h4>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <button class="btn btn-primary more-details-btn" onclick="showMoreDetails('${country.name.common}', '${country.flag.emoji}')">More Details</button>
            `;

            countryContainer.appendChild(countryCard);
        });
    }

    function searchCountries() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();

        const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(searchTerm));

        const countryContainer = document.getElementById("countryContainer");
        countryContainer.innerHTML = "";

        displayCountries(filteredCountries);
    }

    function showMoreDetails(countryName, countryFlag) {
        const apiKey = '3a2cfe75c360c0e2c9ec51ae3daecb56';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(weatherData => {
                const temperature = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                alert(`Weather in ${countryName}:\nTemperature: ${temperature}°C\nDescription: ${weatherDescription}`);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert(`Error fetching weather data for ${countryName}`);
            });
    }
    
});