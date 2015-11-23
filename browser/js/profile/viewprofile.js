app.config(function ($stateProvider) {

    $stateProvider.state('viewprofile', {
        url: '/viewprofile/:profileId',
        templateUrl: 'js/profile/viewprofile.html',
        controller: 'ViewProfileCtrl',
        resolve: {
            userProfile: function($stateParams, UserFactory) {
                return UserFactory.fetchOne($stateParams.profileId)
            }
        }
    });

});

app.controller('ViewProfileCtrl', function (userProfile, $scope) {
    $scope.user = userProfile;
});





































