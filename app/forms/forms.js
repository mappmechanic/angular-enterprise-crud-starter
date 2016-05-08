'use strict';

angular.module('myApp.forms', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forms', {
    templateUrl: 'forms/forms.html',
    controller: 'FormsCtrl'
  });
}])

.controller('FormsCtrl', 
	['$scope','$http','reverseFilter',function($scope,$http,reverse) {
    $scope.master = {};

    $scope.limit = 3;
    $scope.names = [
        {name:'Jani',location:'Norway'},
        {name:'Hege',location:'Sweden'},
        {name:'Kai',location:'Denmark'},
        {name:'User1',location:'Delhi'},
        {name:'User2',location:'North America'},
        {name:'User3',location:'South America'}
    ];

  $scope.update = function(user) {
    if($scope.form.$valid) {

      if($scope.user.email.indexOf('opusconsulting.com') === -1)
      {
        $scope.form.uEmail.$setValidity('email',false);
      }else{
        $scope.master = angular.copy(user);
      }
    }
  };

  $scope.checkEntry = function(){
    if($scope.user.gender !== 'female')
    {
      $scope.form.gender.$setValidity('onlyFemale',false);
    }else
    {
      $scope.form.gender.$setValidity('onlyFemale',true);
    }
  }

  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    $scope.user = angular.copy({});
    $scope.master = angular.copy({});
  };

  $scope.reset();

  $scope.checkPalindrome = function() {
    if($scope.original == reverse($scope.original))
    {
      alert('Yes');
    }else
    {
      alert('No');
    }
  }
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


app.filter('reverse', function() {
  return function(input, uppercase) {
    input = input || '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
});








