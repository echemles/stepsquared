app.config(function ($stateProvider) {

    $stateProvider.state('viewprofile', {
        url: '/viewprofile/:profileId',
        templateUrl: 'js/profile/viewprofile.html',
        controller: 'ViewProfileCtrl',
        resolve: {
            userProfile: function($stateParams, UserFactory) {
                return UserFactory.fetchOne($stateParams.profileId)
            },
            loggedInUser: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.controller('ViewProfileCtrl', function (userProfile, loggedInUser, $scope, lodash, UserFactory, growl) {
    $scope.user = userProfile;
    $scope.loggedInUser = loggedInUser;
    console.log("user is ", $scope.user)
    console.log("logged in user is ", $scope.loggedInUser);

    $scope.isFollowing = function(){
        var output = lodash.contains($scope.loggedInUser.following, function(userId){
                return userId === $scope.user._id;
            }
        )
        return output;  
    }

    $scope.follow = function(){
        UserFactory.follow($scope.loggedInUser._id, $scope.user._id)
        .then(function(user){
            $scope.loggedInUser = user;
        })
        .catch(function(){
            growl.error('Unable to follow this user')
        })
    }

    $scope.unfollow = function(){
        UserFactory.unfollow($scope.loggedInUser._id, $scope.user._id)
        .then(function(user){
            $scope.loggedInUser = user;
        })
        .catch(function(){
            growl.error(`Unable to unfollow ${$scope.user.firstName}`)
        })
    }

});





































