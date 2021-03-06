'use strict';

angular.module('myApp.home', ['ngRoute','ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', 
	['$scope',function($scope) {

  $scope.showSections = false;

  $scope.$on('loginSuccessful',function(eventInfo,data) {
    console.log('Login Successful');
    $scope.welcomeMessage = "Welcome - "+data.userId;
    $scope.showSections = true;
    $scope.$emit('shownData');
  });

  $scope.welcomeMessage = "Welcome to our <b>first</b> Angular web application. <script>alert('hi')</script>";
    
    $scope.sectionsContent = [
        {
         name: 'Section 1',
         text: 'Text content for Section 1. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.'
         ,details:'details1'
        },
        {
         name: 'Section 2',
         text: 'Text content for Section 2. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.'
         ,details:'details2'
        },
        {
         name: 'Section 3',
         text: 'Text content for Section 3. Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.'
         ,details:'details3'
        }
    ];

   $scope.viewDetails = function(index){
   	alert($scope.sectionsContent[index].details);
   }
	
}]);