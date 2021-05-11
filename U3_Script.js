// Uebung3 - Geosoftware I
"use strict"

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '';


//defining variables

var coordinates

//defining functions

  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is provided by the API by openwaethermap.
   */
  function getWeatherData () {

    function success(position) {
      coordinates = position.coords

      let xmlreq = new XMLHttpRequest();

      xmlreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let weatherData = JSON.parse(this.responseText)
          displayWeatherAtPosition(weatherData)
        }
      }

      xmlreq.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly,daily&appid=${personalAPIkey}`);
      xmlreq.send();
    }


    function error(err) {
      console.warn(`Warn(${err.code}) : ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }


  /**
   * displayWeatherAtPosition - Description
   *
   * @param {JSON} weatherData weatherdata in json format
   */
  function displayWeatherAtPosition(weatherData) {
      //prints given location
      document.getElementById("location").textContent = "Your location: " + weatherData.lat + " " + weatherData.lon

      //prints given date
      const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
      let date = new Date(weatherData.current.dt * 1000).toLocaleDateString("EN-EN", options)
      document.getElementById("date").textContent = "Date: " + date

      //prints weather
      document.getElementById("weather").textContent = "Weather: " + weatherData.current.weather[0].main + " description: " + weatherData.current.weather[0].description

      //prints current temperature
      let temp = weatherData.current.temp
      let tempK = Math.round(temp)
      let tempC = Math.round(temp - 273.15)
      document.getElementById("temperature").textContent = "Current temperature: " + tempK +"K/" + tempC + "°C"

      //prints feel-like temperature
      let feellike = weatherData.current.feels_like
      let feellikeK = Math.round(feellike)
      let feellikeC = Math.round(feellike - 273.15)
      document.getElementById("feellike").textContent = "Feels like: " + feellikeK + "K/" + feellikeC + "°C"

      //prints humidity
      document.getElementById("humidity").textContent = "Humidity: " + weatherData.current.humidity + "%"
      //prints pressure
      document.getElementById("pressure").textContent = "Pressure at Sealevel: " + weatherData.current.pressure + " hPa"




      console.log(weatherData) // testing
  }



  /**
   * start - "runner"-function. starts when the html button is pressed
   *
   */
  function start() {
    getWeatherData()
  }
