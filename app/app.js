'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.contact',
  'myApp.users',
  'myApp.version'
]);

app.config(['$routeProvider', function($routeProvider) {
  console.log('configuring')
  $routeProvider.otherwise({redirectTo: '/home'});
}]);

var navCtrl = function(locationService,$scope){
		$scope.links = [{
				display:'HomePage',
				path:'home'
			},{
				display:'Users Dashboard',
				path:'users'
			},{
				display:'Contact Us',
				path:'contact'
			}	]

		$scope.isActive = function(path){
			return ((locationService.path().indexOf(path) > -1) ? true : false);
		};
}

app.controller('NavCtrl',['$location','$scope',navCtrl]);

