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

app.run(['$rootScope','$templateCache','$timeout',function($rootScope,$templateCache,$timeout){
	
	var routeChangeSuccessHandler = function(event,newRoute,oldRoute){
		console.log('Route Change Success');
		console.log(newRoute);
		 $templateCache.removeAll();
		// if(newRoute.loadedTemplateUrl === "users/usersList.html")
		// {
		// 	console.log('userViewLoaded event being broadcasted');
		// 	$rootScope.$broadcast('userVisit');
		// }
	};

	$rootScope.$on('$routeChangeSuccess',routeChangeSuccessHandler);

	$rootScope.$on('$viewContentLoaded',function(event,oldRoute,newRoute){
		$rootScope.pageLoading = false;
	});

	$rootScope.$on('$routeChangeStart',function(event,oldRoute,newRoute){
		$rootScope.pageLoading = true;
	});

	$rootScope.login = function() {
		console.log('Login');
		$timeout(function() {
			$rootScope.$broadcast('loginSuccessful',
				{userId:23,sessionToken:'3432432423'});
		},2000);
	}

	$rootScope.$on('shownData',function() { alert("OK BYE BYE"); });	


	// $rootScope.$on('userVisit',function(event,data){
	// 	console.log('User Visit event was handled :'+event);
	// 	console.log(data);
	// });
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

