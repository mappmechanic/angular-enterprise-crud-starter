'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.users',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  console.log('configuring')
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.controller('NavCtrl',['$location','$scope',
	function(locationService,$scope){
		$scope.isActive = function(path){
			return ((locationService.path().indexOf(path) > -1) ? true : false);
		}
}]);

