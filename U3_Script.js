// Uebung3 - Geosoftware I

// Please integrate your personal openweathermap API key by saving it in the following variable:
var personalAPIkey = '';

/**
 * Function to show the weather of the current location on the webpage.
 */
function showWeather() {
    var weatherInformation = convertWeatherData(getWeatherData(getPosition()));
    document.getElementById("weather").innerHTML = weatherInformation;
}

/**
 * Function to get the current position (latitude, longitude).
 * @returns {Array} latitude, longitude
 */
function getPosition() {
    const status = document.querySelector('#status');

    function success(position) {
        var longitude = position.coords.longitude;
        var latitude  = position.coords.latitude;
        var currentPosition = [longitude, latitude];
        document.getElementById("Ausgabe").innerHTML = currentPosition;   //zum Testen: funktioniert
        return currentPosition;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
        document.getElementById("Ausgabe2").innerHTML = currentPosition;  //zum Testen: funktioniert nicht
        return currentPosition;
    }
  }

  /**
   * Function to get a JSON object with information on weather of the selected position.
   * The data is privided by the API by openwaethermap.
   * @param {Array} - position(lat, long)
   * @returns {JSON} - JSON containig data on weather
   */
  function getWeatherData (Position) {
      const status = document.querySelector('#status');
      var lat = Position [0];
      var lon = Position [1];
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


