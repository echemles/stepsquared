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

app.controller('StepsNavCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory, StepsFactory, lodash, units) {
    $scope.tutorial = currentTutorial;

    $scope.currentIndex = {
        idx: null
    }
    
    $scope.nextStep = function(){
        if($scope.currentIndex.idx+1 < $scope.tutorial.steps.length){
            $scope.currentStep.step = $scope.tutorial.steps[$scope.currentIndex.idx+1]
            $state.go('stepsNav.edit', {stepId: $scope.currentStep.step._id})
        } else{
            growl.error("There isn't a next step! Click CREATE STEP to make a new one!")
        }
        
    }

    $scope.prevStep = function(){
        if($scope.currentIndex.idx-1 >-1){
            $scope.currentStep.step = $scope.tutorial.steps[$scope.currentIndex.idx-1]
            $state.go('stepsNav.edit', {stepId: $scope.currentStep.step._id })
        } else {
            $state.go('editTutorial', {tutorialId: $scope.tutorial._id})
        }
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











