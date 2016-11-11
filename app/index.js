var app = angular.module('myApp', []);

app.controller('myCtrl', ['$http', function($http) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=5f58edfe616a630892434c80c7630254")
      .then(function(response){
        console.log(response.data);
      })
    })
  }
}])


