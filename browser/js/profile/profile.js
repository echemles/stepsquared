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

app.controller('ProfileCtrl', function (currentUser, growl, $scope, UserFactory, TutorialFactory) {
    $scope.user = currentUser;
    TutorialFactory.fetchByUser(currentUser._id)
        .then(function(tutorials){
            $scope.tutorials = tutorials;
        })
        .catch(function(err){
            growl.error('Tutorials not available', err)
        });

    $scope.updateUser = function(updatedInfo){
        if(Object.keys(updatedInfo).length > 0) updatedInfo._id = $scope.user._id;
        UserFactory.updateUser(updatedInfo)
        .then(function(user){
            $scope.user = user;
            growl.success("You've updated successfully!")
        })
        .catch(function (err) {
            growl.error('Something went wrong!', err);
        });
    }


});





































