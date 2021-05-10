// Uebung3 - Geosoftware I

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '';



//defining variables





/**
 * Function to get the current position.
 * @returns {Array} longitude, latitude
 */
function getPosition() {
    let status = document.querySelector('#status');
    let coordinates
    function success(position) {

        coordinates = position.coords
        console.log(coordinates)

    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
        getWeatherData(coordinates)
    }
  }

  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is privided by the API by openwaethermap.
   * @returns {JSON} - JSON containig data on weather
   */
  function getWeatherData (coordinates) {
      const status = document.querySelector('#status');

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
