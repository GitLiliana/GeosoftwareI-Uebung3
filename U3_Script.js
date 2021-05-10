// Uebung3 - Geosoftware I
"use strict"

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '';


//defining variables

var coordinates

//defining functions


  function success(position) {
    coordinates = position.coords

    console.log(coordinates)
  }

  function error(err) {
    console.warn(`Warn(${err.code}) : ${err.message}`)
  }


  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is privided by the API by openwaethermap.
   * @returns {JSON} - JSON containig data on weather
   */
  function getWeatherData () {

      navigator.geolocation.getCurrentPosition(success, error)
      console.log(coordinates)


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


  /**
   * displayWeatherAtPosition - Description
   *
   * @param {JSON} weatherData weatherdata in json format
   */
  function displayWeatherAtPosition(weatherData) {
      console.log(weatherData)
  }



  /**
   * start - "runner"-function. starts when the html button is pressed
   *
   */
  function start() {
    getWeatherData()
  }
