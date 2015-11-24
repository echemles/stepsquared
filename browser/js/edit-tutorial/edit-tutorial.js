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
            }, 
            units: function(TutorialFactory){
                return TutorialFactory.getUnits()
            }
        }
    });

});

app.controller('EditTutorialCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory, Upload, categories, units) {
    console.log("tutorial.media is ", currentTutorial.media)
    $scope.units = units;

    $scope.categories = categories; 

    $scope.isUploading = {isUploading: false}

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

    $scope.tools = [];
    if($scope.tutorial){
        var equipment = $scope.tutorial.equipment;
        if(equipment.length){
            for(var i = 0; i < equipment.length; i++){
                $scope.tools.push({name: equipment[i]})
            }
        }
        else{
            $scope.tutorial.equipment = []
        }

        $scope.tutorial.requirements = !$scope.tutorial.requirements ? [{}] : $scope.tutorial.requirements
    }
    $scope.file;


    $scope.update = function(){
        console.log("tutorial media is ", $scope.tutorial.media)
        $scope.tutorial.equipment = [];
        $scope.tools.forEach(function(tool){
            $scope.tutorial.equipment.push(tool.name)
        })
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

    $scope.updateMedia = function(media){
        if(!$scope.tutorial.media){
            //create media object
            //set the media object of the current tutorial
            MediaFactory.create(media)
            .then(function(media){
                $scope.tutorial.media = media._id
                return TutorialFactory.update($scope.tutorial)
            })
            .then(function(){
                growl.success("Media uploaded")
            })
            .catch(function(err){
                console.error(err)
                growl.error("Unable to upload media")
            })
        }
        else{
            MediaFactory.update(media)
            .then(function(){
                growl.success("Media uploaded")
            })
            .catch(function(err){
                console.error(err)
                growl.error("Unable to upload media")
            })
        }
    }


    $scope.removeRequirement = function(idx){
        $scope.tutorial.requirements.splice(idx,1)
    }

    $scope.addRequirement = function(){
        $scope.tutorial.requirements.push({})
    }

    $scope.addTool = function(){
        $scope.tools.push({})
    }

    $scope.removeTool = function(idx){
        $scope.tools.splice(idx, 1)
    }
});





