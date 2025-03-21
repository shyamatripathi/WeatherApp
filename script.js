async function getWeather() {
    const apiKey = "012a1cfbcdf74231a9b164453252103";
    const location = document.getElementById("locationInput").value;
    
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weatherResult").innerHTML = `<p style="color:red;">${data.error.message}</p>`;
        } else {
            document.getElementById("weatherResult").innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperature: ${data.current.temp_c}°C</p>
                <p>Condition: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Weather icon">
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} km/h</p>
            `;
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color:red;">Failed to fetch weather data.</p>`;
    }
}
