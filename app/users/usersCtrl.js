
var usersCtrlFunction = function($scope,usersData,userService) {
    
    $scope.refreshUsers = refreshUsers;
    $scope.refreshUsers();
    $scope.currentAction = 'Add';
    $scope.editUserIndex = -1;
    
    $scope.userForm = { name:'',location:''};
    
    $scope.editUserFunc = editUser;
    $scope.removeUser = removeUser;
    $scope.submitForm = submitForm;
    $scope.addUserBtnClicked = addUserBtnClicked;
    
    function addUser(newUserObj) {
    	if(newUserObj.name && newUserObj.name.length > 0)
    	{
        	userService.createUser(newUserObj)
          .then(function(response) {
            $scope.users.push(response.data);
          },function(error) {
            console.log(error);
          });
      }
    }
    
    function addUserBtnClicked() {
      $scope.currentAction = 'Add';
      $scope.userForm = { name:'',location:''};
    }
    
    function removeUser(index) {
        $scope.users.splice(index,1);   
    }
    
    function updateUser(index,updatedUserObj) {
        $scope.users[index] = updatedUserObj;
    }
    
    function editUser(index) {
        $scope.currentAction = 'Edit';
        $scope.editUserIndex = index;
        $scope.userForm = angular.copy($scope.users[index]);
    }
    
    function submitForm() {
     if($scope.currentAction === 'Add') {
       addUser($scope.userForm);   
     }else if($scope.currentAction === 'Edit')
     {
       updateUser($scope.editUserIndex,$scope.userForm);
     }
     $scope.userForm = { name:'',location:''};
    }

    function refreshUsers() {
      $scope.users = userService.getUsersList();
      $scope.usersLoading = true;
      $scope.users.then(getUsersListSuccessCb,getUsersListErrorCb);
    }

    function getUsersListSuccessCb(data){
      $scope.users = data;
      $scope.usersLoading = false;
    }

    function getUsersListErrorCb(error){
      $scope.usersLoading = false;
      console.log(error);
    }

};

usersCtrlFunction.$inject = ['$scope','usersData','UserService'];

angular.module('myApp.users')
.controller('UsersCtrl',usersCtrlFunction);