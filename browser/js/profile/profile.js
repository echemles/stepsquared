app.config(function ($stateProvider) {

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.controller('ProfileCtrl', function (currentUser, growl, $scope, UserFactory) {
    $scope.error = null;
    $scope.user = currentUser;

    $scope.updateUser = function(updatedInfo){
        if(Object.keys(updatedInfo).length > 0) updatedInfo._id = $scope.user._id;
        UserFactory.updateUser(updatedInfo)
        .then(function(user){
            $scope.user = user;
            growl.success("You've updated successfully!")
        })
        .catch(function () {
            $scope.error = 'Something went wrong!';
        });
    }


});




































