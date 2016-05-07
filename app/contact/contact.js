'use strict';

angular.module('myApp.contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
}])

.controller('ContactCtrl', 
	['$scope','$http',function($scope,$http) {
	 
   $scope.address="";
   var apiUrl = "http://maps.google.com/maps/api/geocode/json?address=";
   $scope.searchAddress = function(){
      $http.get(apiUrl+$scope.address)
      .then(function(response){
        $scope.results = response.data.results;
        $scope.errorMsg = null;
      },function(error){
        console.log(error);
        $scope.errorMsg = "Some Error Occurred";
      });
   }
}]);