// Setup module
var app = angular.module('myApp', []);

// Setup controller
app.controller('myCtrl', ['$http', '$scope', function($http, $scope) {
  // Find the geolocation coordinates if available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Use AngularJs to request for the json of the OpenWeatherMap API
      $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=5f58edfe616a630892434c80c7630254")
      // Store and display the data received
      .then(function(response){
        $scope.city = response.data.name + ", " + response.data.sys.country;
        $scope.icon = "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";
        $scope.windSpeed = Math.round(response.data.wind.speed / 0.44704); // convert from m/s to mi/hr
        $scope.humidity = response.data.main.humidity;
        $scope.temp = Math.round(response.data.main.temp * (9 / 5) - 459.67); // convert from K to F
        $scope.cloudiness = response.data.clouds.all;
      })
    })
  }
}])


