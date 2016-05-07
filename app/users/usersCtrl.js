
var usersCtrlFunction = function($scope,usersData) {
    console.log(usersData);
    
    $scope.users = usersData;
    $scope.currentAction = 'Add';
    $scope.editUserIndex = -1;
    
    $scope.userForm = { username:'',location:''};
    
    $scope.editUser = editUser;
    $scope.removeUser = removeUser;
    $scope.submitForm = submitForm;
    $scope.addUserBtnClicked = addUserBtnClicked;
    
    function addUser(newUserObj) {
    	if(newUserObj.username && newUserObj.username.length > 0)
    	{
        	$scope.users.push(newUserObj);
        }
    }
    
    function addUserBtnClicked() {
      $scope.currentAction = 'Add';
      $scope.userForm = { username:'',location:''};
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
     $scope.userForm = { username:'',location:''};
    }
};

usersCtrlFunction.$inject = ['$scope','usersData'];

angular.module('myApp.users')
.controller('UsersCtrl',usersCtrlFunction);