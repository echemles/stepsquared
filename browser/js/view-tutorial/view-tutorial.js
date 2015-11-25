app.config(function ($stateProvider) {

    $stateProvider.state('viewTutorial', {
        url: '/viewTutorial/:tutorialId',
        templateUrl: 'js/view-tutorial/view-tutorial.html',
        controller: 'viewTutorialCtrl',
        resolve: {
            theTutorial: function(TutorialFactory, $stateParams){
                return TutorialFactory.fetchOne($stateParams.tutorialId)
            },
            currentUser: function(AuthService){
                return AuthService.getLoggedInUser();
            },
            favorites: function(TutorialFactory, $stateParams){
                return TutorialFactory.getFavorites($stateParams.tutorialId)
            }
        }
    });

});

app.controller('viewTutorialCtrl', function ($scope,favorites, TutorialFactory, theTutorial, $state) {

    $scope.tutorial = theTutorial;
    
});