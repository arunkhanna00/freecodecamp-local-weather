var app = angular.module('myApp', []);

app.controller('myCtrl', ['$http', '$scope', function($http, $scope) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=5f58edfe616a630892434c80c7630254")
      .then(function(response){
        console.log(response.data);
        $scope.city = response.data.name;
        $scope.icon = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";
        $scope.windSpeed = response.data.wind.speed;
        $scope.humidity = response.data.main.humidity;
        $scope.pressure = response.data.main.pressure;
        $scope.temp = response.data.main.temp;
      })
    })
  }
}])


