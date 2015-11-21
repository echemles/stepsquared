
app.config(function ($stateProvider) {
    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl: 'js/admin/admin-users.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            allUsers: function(UserFactory) {
                  return UserFactory.fetchAll();                    
            }
        } 
    })
});

app.controller('AdminUsersCtrl', function ($scope, AuthService, $state, allUsers, UserFactory, growl) {
    
    $scope.login = {};
    $scope.error = null;

    $scope.allUsers = allUsers;
 

    $scope.deleteUser = function (index){
        AuthService.getLoggedInUser()
        .then (function (loggedInUser){
            if (loggedInUser._id === $scope.allUsers[index]._id)
                growl.error("Sorry you can't delete yourself")
            else{
                if (confirm("Are you sure you want to delete " + $scope.allUsers[index].email + "?")){
                    UserFactory.deleteUser($scope.allUsers[index]._id)
                    .then(function(){
                        $scope.allUsers.splice(index,1);
                        growl.success("Successfully deleted user")
                    })
                    .catch(function(err) {
                        growl.error("Error deleting user")
                    })
                }
            }
        })
    }

});