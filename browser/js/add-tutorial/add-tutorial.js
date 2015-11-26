app.config(function ($stateProvider) {
    $stateProvider.state('addTutorial', {
        url: '/add-tutorial/:userId',
        templateUrl: 'js/add-tutorial/add-tutorial.html',
        controller: 'AddTutorialCtrl',
        resolve: {
            categories: function(CategoryFactory){
                return CategoryFactory.getAll();
            }, 
            units: function(TutorialFactory){
                return TutorialFactory.getUnits()
            },
            user: function($stateParams){
                return $stateParams.userId;
            }
        }
    });

});

app.controller('AddTutorialCtrl', function ($scope, $state, growl, TutorialFactory, MediaFactory, Upload, categories, units, user) {
    $scope.units = units;
    $scope.categories = categories; 
    $scope.isUploading = {isUploading: false}
    $scope.hasRequirement = false;
    $scope.tutorial = {};
    $scope.tutorial.tools = [];
    $scope.tutorial.requirements = [];
    $scope.tutorial.equipment = [];

    $scope.create = function(){
        $scope.tutorial.author = user;
        TutorialFactory.create($scope.tutorial)
        .then(function(tutorial){
           $scope.tutorial = tutorial;
            growl.success("Created tutorial successfully!")
        }, function(err){
            growl.error("Failed to create tutorial")
        })     
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
        uploadS3($scope.file)
        .then(function(imageUrl){
            $scope.media.type = 'image';
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
        media.type = 'image';
        MediaFactory.create(media)
        .then(function(media){
            $scope.tutorial.media = media._id
            growl.success("Media uploaded")
        })
        .catch(function(err){
            console.error(err)
            growl.error("Unable to upload media")
        })
    }


    $scope.removeRequirement = function(idx){
        $scope.tutorial.requirements.splice(idx,1)
    }

    $scope.addRequirement = function(requirement){
        $scope.hasRequirement = true;
        $scope.tutorial.requirements.push({})
    }

    $scope.addTool = function(){
        $scope.tutorial.tools.push({})
    }

    $scope.removeTool = function(idx){
        $scope.tutorial.tools.splice(idx, 1)
    }
});





