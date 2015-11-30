app.config(function ($stateProvider) {
    $stateProvider.state('stepsNav.edit', {
        url: '/:stepId',
        templateUrl: 'js/steps-nav/edit-step.html',
        controller: 'EditStepCtrl',
        resolve: {
        	currentStep: function(StepsFactory, $stateParams, $state){
            	return StepsFactory.getStep($stateParams.stepId)
                .then(function(step){
                    if(!step) $state.go('editTutorial', {tutorialId: $stateParams.tutorialId})
                    else return step;

                })
            }

        }
    });

});

app.controller('EditStepCtrl', function ($scope, currentStep, growl, StepsFactory, $state, TutorialFactory, lodash, MediaFactory, $rootScope) {
	$scope.step = currentStep;
	$scope.currentStep.step = currentStep;
    var currentIdx = lodash.findIndex($scope.tutorial.steps, function(step){ 
        return step._id == $scope.currentStep.step._id
    })
    $scope.currentIndex.idx = currentIdx;
    $scope.$parent.currentIndex.idx = currentIdx;

	$scope.step.requirements = !$scope.step.requirements ? [{}] : $scope.step.requirements;
	$scope.mediaObj = currentStep.media;

    $scope.update = function(){
        for(var i = 0; i < $scope.step.requirements.length; i++){
           delete $scope.step.requirements[i].$$hashKey;
           delete $scope.step.requirements[i].item;
           delete $scope.step.requirements[i].unit;

        }
        StepsFactory.updateStep($scope.tutorial._id, $scope.step)
        .then(function(tutorial){
            $scope.$parent.tutorial = tutorial;
            growl.success("Updated step successfully!")
        }, function(err){
            growl.error("Failed to update step")
        })
    }

    $scope.delete = function() {
    	StepsFactory.deleteStep($scope.tutorial._id, $scope.step._id)
    	.then(function(tutorial) {
            $scope.$parent.tutorial = tutorial;
            if($scope.tutorial.steps.length > 0){
                var indexToNavigate = $scope.currentIndex.idx === 0 ? 0: $scope.currentIndex.idx - 1
                var stepIdToNavigate = $scope.tutorial.steps[indexToNavigate]._id
              $state.go('stepsNav.edit',{stepId: stepIdToNavigate})  
            } else{
                $state.go('editTutorial', {tutorialId: $scope.tutorial._id})
            }
    		
    	})
    }

    $scope.getAllStepReqs = function(){
        var arrOfSteps = $scope.$parent.tutorial.steps; 
        var reqsObj = {};
        for(var i =0; i < arrOfSteps.length; i++){
            if( i != $scope.currentIndex.idx) {
                for(var j =0; j < arrOfSteps[i].requirements.length; j++){
                    var requirement = arrOfSteps[i].requirements[j];
                    if(!reqsObj[requirement.unitItem]){
                        reqsObj[requirement.unitItem] =0;
                    } 
                    reqsObj[requirement.unitItem]+= requirement.quantity;
                }
            }
        }
        return reqsObj;
    }
    $scope.availableReqs = function(){
        var usedReqs = $scope.getAllStepReqs();
        var availableReqsArr = angular.copy($scope.$parent.tutorial.requirements)
        for(var i = 0; i < availableReqsArr.length; i++){
            if(usedReqs[availableReqsArr[i].unitItem]){
               availableReqsArr[i].quantity -= usedReqs[availableReqsArr[i].unitItem]
            }
            
        }
        return availableReqsArr;
    }

    $scope.theAvailableReqs = $scope.availableReqs();
    $scope.availReqObj = {};
    for(var i=0; i<$scope.theAvailableReqs.length; i++ ) {
        $scope.availReqObj[$scope.theAvailableReqs[i].unitItem] = $scope.theAvailableReqs[i].quantity;
    }

    $scope.updateMedia = function(media){
        if(!$scope.step.media) {
            return MediaFactory.create(media)
            .then(function(media) {
                $scope.step.media = media._id;
                return StepsFactory.updateStep($scope.step)
            })
        }
        else {
            return MediaFactory.update(media)
        }
    }


    $scope.removeRequirement = function(idx){
        $scope.step.requirements.splice(idx,1)
    }
    $scope.addRequirement = function(){
        $scope.step.requirements.push({})
    }

});