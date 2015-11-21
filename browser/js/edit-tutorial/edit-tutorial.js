app.config(function ($stateProvider) {
    $stateProvider.state('editTutorial', {
        url: '/edit-tutorial/:tutorialId',
        templateUrl: 'js/edit-tutorial/edit-tutorial.html',
        controller: 'EditTutorialCtrl',
        resolve: {
            currentTutorial: function(TutorialFactory, $stateParams){
                if($stateParams.tutorialId){
                    return TutorialFactory.fetchOne($stateParams.tutorialId)
                } else {
                    return null;
                }
                
            }
        }
    });

});

app.controller('EditTutorialCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory) {
    $scope.create = function(){
        TutorialFactory.create($scope.tutorial)
        .then(function(tutorial){
            currentTutorial = tutorial;
            $scope.tutorial = tutorial;
            growl.success("Created tutorial successfully!")
        }, function(err){
            growl.error("Failed to create tutorial")
        })     
    }

    $scope.tutorial = currentTutorial;
    $scope.update = function(){
        if(currentTutorial){
            TutorialFactory.update($scope.tutorial)
            .then(function(){
                growl.success("Updated tutorial successfully!")
            }, function(err){
                growl.error("Failed to update tutorial")
            })
        } else {
            $scope.create();
        }
        
    }
       
    $scope.delete = function(){
        TutorialFactory.delete($scope.tutorial._id)
        .then(function(){
            growl.success("Deleted tutorial successfully!")
        }, function(err){
            growl.error("Failed to delete tutorial")
        })
    }

    $scope.addMedia = function(){
        MediaFactory.create($scope.media)
        .then(function(media){
            growl.success("Created media successfully!")
        }, function(err){
            growl.error("Failed to create media")
        })
    } 

    $scope.updateMedia = function(){
        MediaFactory.update($scope.media)
        .then(function(media){
            growl.success("Updated media successfully!")
        }, function(err){
            growl.error("Failed to update media")
        })
    }



});