app.config(function ($stateProvider) {
    $stateProvider.state('stepsNav', {
        url: '/edit-tutorial/:tutorialId/steps-nav',
        templateUrl: 'js/steps-nav/steps-nav.html',
        controller: 'StepsNavCtrl',
        resolve: {
            currentTutorial: function(TutorialFactory, $stateParams){
                return TutorialFactory.fetchOne($stateParams.tutorialId)
            },
            units: function(TutorialFactory){
                return TutorialFactory.getUnits()
            }
        }
    });

});


app.config(function ($stateProvider) {
    $stateProvider.state('stepsNav.edit', {
        url: '/:stepId',
        templateUrl: 'js/steps-nav/edit-step.html',
        controller: 'EditStepCtrl',
        resolve: {
        	currentStep: function(StepsFactory, $stateParams){
            	return StepsFactory.getStep($stateParams.stepId)
            }

        }
    });

});

app.controller('EditStepCtrl', function ($scope, currentStep, growl, StepsFactory, $state, TutorialFactory) {
	$scope.step = currentStep;
	$scope.currentStep.step = currentStep;
	$scope.step.requirements = !$scope.step.requirements ? [{}] : $scope.step.requirements;
	$scope.mediaObj = currentStep.media;

    $scope.update = function(){
        StepsFactory.updateStep($scope.step)
        .then(function(step){
            $scope.tutorial.requirements.push($scope.step.requirements[$scope.step.requirements.length-1])
            return TutorialFactory.update($scope.tutorial)     
        })
        .then(function(tutorial){
            growl.success("Updated step successfully!")
        }, function(err){
            growl.error("Failed to update step")
        })
    }

    $scope.delete = function() {
        //need to delete step from Tutorial as well
    	StepsFactory.deleteStep($scope.step._id)
    	.then(function() {
            
    		$state.go('stepsNav',{tutorialId: $scope.tutorial._id})
    	})
    }



    $scope.updateMedia = function(mediaId){
        $scope.step.media = mediaId;
        return StepsFactory.updateStep($scope.step)
        .then(function(step){
            growl.success("Media uploaded")
        })
        .catch(function(err){
            growl.error("Unable to upload media")
        })
    }


    $scope.removeRequirement = function(idx){
        //need to delete requirements from Tutorial as well
        $scope.step.requirements.splice(idx,1)
    }
    $scope.addRequirement = function(){
        $scope.step.requirements.push({})
    }

});


app.controller('StepsNavCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory, StepsFactory, lodash, units) {
    $scope.tutorial = currentTutorial;
    
    $scope.nextStep = function(){
        var currentIdx = lodash.findIndex($scope.tutorial.steps, function(step){ return step._id == $scope.currentStep.step._id})
        if(currentIdx+1 < $scope.tutorial.steps.length){
            console.log("here are the tutorial requirements", $scope.tutorial.requirements)
            $scope.currentStep.step = $scope.tutorial.steps[currentIdx+1]
        } else{
            growl.error("There isn't a next step! Click CREATE STEP to make a new one!")
        }
        $state.go('stepsNav.edit', {stepId: $scope.currentStep.step._id})
    }

    $scope.prevStep = function(){
        var currentIdx = lodash.findIndex($scope.tutorial.steps, function(step){ return step._id == $scope.currentStep.step._id})
        if(currentIdx-1 >-1){
            $scope.currentStep.step = $scope.tutorial.steps[currentIdx-1]
        } else {
            growl.error("This is the first step!")
        }
        $state.go('stepsNav.edit', {stepId: $scope.currentStep.step._id })
    }


    $scope.currentStep = {
    	step: null
    };

    $scope.units = units;

    $scope.isUploading = {isUploading: false}
    var newStepId;
    $scope.createStep = function(){
        StepsFactory.createStep({tutorialId: $scope.tutorial._id, step: {}})
        .then(function(step){
        	$scope.tutorial.steps.push(step)
        	newStepId = step._id;
        	return TutorialFactory.update($scope.tutorial)
        })
        .then(function(tutorial){
        	$scope.tutorial = tutorial;
        	$state.go("stepsNav.edit", {stepId: newStepId })
            growl.success("Created step successfully!")
        })
        .catch(function(err){
        	console.log(err)
        	growl.error("Failed to create step")
        })     
    }

    


       
});











