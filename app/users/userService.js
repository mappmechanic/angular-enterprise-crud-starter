
var userServiceFunc = function($http,$q) {
	var baseUrl = 'http://localhost:3000/api';
  this.getUsersList = function() {
    var deferred = $q.defer(); 
    $http.get(baseUrl+'/users')
    .then(successCb,errorCb);

    function successCb(response){
      console.log(response);
      if(response.status === 200)
      {
        deferred.resolve(response.data);
      }else
      {
        deferred.reject({error:'Unkown Error'});
      }
    }

    function errorCb(errorResponse){
      console.log(errorResponse);
      deferred.reject(errorResponse);
    }

    return deferred.promise;
  }


  // Simple Method of Providing Promise Returned by $http Call
  this.createUser = function(newUserObject) {
    return $http.post(baseUrl+'/users',{"user":newUserObject});
  }




}

userServiceFunc.$inject = ['$http','$q'];

angular.module('myApp.users')
.service('UserService',userServiceFunc);