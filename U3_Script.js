// Uebung3 - Geosoftware I

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '8b12a89947954694a8d54881188c2aee';



//defining variables
let longitude = ""
let latitude = ""
let weatherData
let weatherInformation


/**
 * Function to show the weather of the current location on the webpage.
 */
function showWeather() {
    getPosition()
    weatherData = getWeatherData()
    displayWeatherAtPosition()
    document.getElementById("weather").innerHTML = weatherInformation
}

/**
 * Function to get the current position.
 * @returns {Array} longitude, latitude
 */
function getPosition() {
    let status = document.querySelector('#status');

    function success(position) {
        longitude = position.coords.longitude
        latitude = position.coords.latitude
        console.log(longitude.type)

    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);

    }
  }

  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is privided by the API by openwaethermap.
   * @returns {JSON} - JSON containig data on weather
   */
  function getWeatherData () {
      const status = document.querySelector('#status');

      let xmlreq = new XMLHttpRequest();

      xmlreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let weatherData = JSON.parse(this.responseText)
          console.log(weatherData)
          return weatherData
        }
      }

      xmlreq.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${personalAPIkey}`);
      xmlreq.send();
  }


  /**
   * displayWeatherAtPosition - Description
   *
   * @param {JSON} weatherData weatherdata in json format
   */
  function displayWeatherAtPosition(weatherData) {

  }
