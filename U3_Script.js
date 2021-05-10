// Uebung3 - Geosoftware I

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '8b12a89947954694a8d54881188c2aee';



//defining variables
let coordinates
let weatherData
let weatherInformation
console.log("simon")

/**
 * Function to show the weather of the current location on the webpage.
 */
function showWeather() {
    coordinates = getPosition()
    weatherData = getWeatherData()
    weatherInformation = convertWeatherData(weatherData)
    document.getElementById("weather").innerHTML = weatherInformation
}

/**
 * Function to get the current position.
 * @returns {Array} longitude, latitude
 */
function getPosition() {
    let status = document.querySelector('#status');
    let currentPosition = []

    function success(position) {
        currentPosition.push(position.coords.longitude)
        currentPosition.push(position.coords.latitude)

    }

    function error() {
      status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
        console.log(currentPosition)
        return currentPosition
    }
  }

  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is privided by the API by openwaethermap.
   * @param {Array} - position(lat, long)
   * @returns {JSON} - JSON containig data on weather
   */
  function getWeatherData () {
      const status = document.querySelector('#status');
      let lon = coordinates[0]
      let lat = coordinates[1]
      var weatherJSON = new XMLHttpRequest();

      xhr.open("GET", "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,daily&appid="+personalAPIkey);
      xhr.onload = convertWeatherData(weatherJSON);
      xhr.send();
      xhr.onerror = function() {
        status.textContent = 'Unable to retrieve weather data.';
      }
      xhr.onreadystatechange;  //Verstehe den Unterschied zu onload nicht? Warum wichtig? Braucht man beides?
  }

  /**
   * Function to convert weather data from JSON format into into humanly readable information.
   * @param {JSON} - JSON containing data on weather
   */
  function convertWeatherData (WeatherJSON) {
      //implementation needed
      weatherJSONString = JSON.stringify(weatherJSON);   //only for testing
      return weatherJSONString;    //only for testing
  }
