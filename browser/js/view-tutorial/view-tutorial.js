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

app.controller('viewTutorialCtrl', function ($scope,favorites, growl, TutorialFactory, theTutorial, AuthService, UserFactory, currentUser) {
    $scope.tutorial = theTutorial;
    $scope.list = []; 

    $scope.toggleItemInList = function(requirement){
        // adds or remove from grocery list
        if($scope.list.indexOf(requirement) === -1){
            $scope.list.push(requirement)
        } else {
            $scope.list.splice($scope.list.indexOf(requirement), 1);
        }
    }

    $scope.saveList = function(){
        var groceryList = {};
        groceryList.recipeId = theTutorial._id;
        groceryList.name = theTutorial.name;
        groceryList.list = $scope.list;
        var userId = currentUser._id;
        UserFactory.updateGrocery(groceryList, userId)
        .then(function(){
            growl.success("Your grocery list has been updated.")
        });
    }
});