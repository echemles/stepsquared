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
                    return {};
                }
                
            },
            categories: function(CategoryFactory){
                return CategoryFactory.getAll();
            }
        }
    });

});

app.controller('EditTutorialCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory, $uibModal, MediaModal, Upload, categories) {
    $scope.categories = categories; 

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

    if($scope.tutorial){
        $scope.tutorial.requirements = !$scope.tutorial.requirements ? [{}] : $scope.tutorial.requirements
        $scope.tutorial.equipment = $scope.tutorial.equipment.length ? $scope.tutorial.equipment : [""]
    }
    $scope.media = $scope.tutorial ? $scope.tutorial.photos[0]: {};
    $scope.file;

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

    $scope.addMediaModal = function(){
        var modalInstance = $uibModal.open(MediaModal($scope))

        modalInstance.result.then(function(result){
            console.log("result from modal is ", result)
        })
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
        console.log("in add media")
        uploadS3($scope.file)
        .then(function(imageUrl){
            $scope.media.url = imageUrl;
            return MediaFactory.create($scope.media)
        })
        .then(function(media){
            growl.success("Created media successfully!")
        })
        .catch(function(err){
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

    $scope.removeRequirement = function(idx){
        $scope.tutorial.requirements.splice(idx,1)
    }

    $scope.addRequirement = function(){
        $scope.tutorial.requirements.push({})
    }

    $scope.addTool = function(){
        $scope.tutorial.equipment.push("")
    }

    $scope.removeTool = function(idx){
        $scope.tutorial.equipment.splice(idx, 1)
    }





});





