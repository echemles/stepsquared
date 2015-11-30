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


app.controller('viewTutorialCtrl', function ($scope, UserFactory, favorites, TutorialFactory, theTutorial, AuthService, currentUser, lodash, growl, $state) {

    $scope.user = currentUser;
    $scope.tutorial = theTutorial;
    $scope.review = {};
    $scope.list = []; 

    $scope.$watch('review', function(){
        console.log('review')
    })

    $scope.addReview = function(){
        return TutorialFactory.addReview($scope.tutorial._id, $scope.review.rating, $scope.user._id)
        .then(function(tutorial){
            $scope.tutorial = tutorial;
            growl.success('Review added successfully')
        })
        .catch(function(){
            growl.error("There was an error processing your review.")
        })
    }

    $scope.alreadyReviewed = function(){
        var output = lodash.find($scope.tutorial.reviews, function(review){
            return review.user._id === $scope.user._id
        })
        return output;
    }

    $scope.toggleItemInList = function(requirement){
        // adds or remove from grocery list
        if($scope.list.indexOf(requirement) === -1){
            $scope.list.push(requirement)
        } else {
            $scope.list.splice($scope.list.indexOf(requirement), 1);
        }
    }

    $scope.saveList = function(){
        console.log('saving list', UserFactory)
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