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

    $scope.isFollowing = function(){
        var output = lodash.find($scope.loggedInUser.following, function(followingUserId){
                return followingUserId === $scope.user._id;
            }
        )   
        output = !!output
        return !!output;  
    }

    $scope.follow = function(){
        UserFactory.follow($scope.loggedInUser._id, $scope.user._id)
        .then(function(user){
            $scope.loggedInUser = user;
        })
        .catch(function(){
            growl.error(`Unable to follow ${$scope.user.firstName}`)
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





































