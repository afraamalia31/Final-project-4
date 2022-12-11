let weather = {
    apiKey: "2a6de1771bc27a3bc79cbf0007c5b959",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { country } = data.sys;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { all } = data.clouds;
      const { lat, lon} = data.coord;
      document.querySelector(".city").innerText = "City: " + name + "," + country;
      document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText =  "Conditions: " + description;
      document.querySelector(".temp").innerText = "Temperature: " + temp + "°C";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
      document.querySelector(".clouds").innerText = "Clouds: " + all + "%";
      document.querySelector(".geo-coordinates").innerText = "Geo Coordinates: " + lat + ", " + lon;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Bali");
  
  function searchBar() {
    weather.search();
  }