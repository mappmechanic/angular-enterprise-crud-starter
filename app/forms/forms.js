'use strict';

angular.module('myApp.forms', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forms', {
    templateUrl: 'forms/forms.html',
    controller: 'FormsCtrl'
  });
}])

.controller('FormsCtrl', 
	['$scope','$http',function($scope,$http) {
    $scope.master = {};

  $scope.update = function(user) {
    if($scope.form.$valid) {

      if($scope.user.email.indexOf('opusconsulting.com') === -1)
      {
        debugger;
        $scope.form.uEmail.$setValidity('email',false);
      }else{
        $scope.master = angular.copy(user);
      }
    }
  };

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.user = angular.copy({});
    $scope.master = angular.copy({});
  };

  $scope.reset();
}]);

var app = angular.module('myApp.forms');

var INTEGER_REGEXP = /^\-?\d+$/;
app.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});

app.directive('username', function($q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
    var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            // The username is available
            def.resolve();
          } else {
            def.reject();
          }

        }, 2000);

        return def.promise;
      };
    }
  };
});