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
            }
        }
    });

});

app.controller('viewTutorialCtrl', function ($scope, TutorialFactory, theTutorial, $state) {
    $scope.tutorial = theTutorial;
});