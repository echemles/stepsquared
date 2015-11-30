app.config(function($stateProvider){
	$stateProvider.state('viewStepNav.viewStep', {
		url: '/:stepId',
		templateUrl: 'js/view-step/view-step.html',
		controller: 'ViewStepCtrl',
		resolve: {
			currentStep: function($stateParams, StepsFactory, $state){
				return StepsFactory.getStep($stateParams.stepId)
				// .then(function(step){
    //                 if(!step) $state.go('viewTutorial', {tutorialId: $stateParams.tutorialId})
    //                 else return step; })
			}	
		}
	})
})

app.controller('ViewStepCtrl',function($scope, currentStep, $sce, lodash){
	$scope.step = currentStep;
	$scope.currentStep.step = currentStep;
	var currentIdx = lodash.findIndex($scope.tutorial.steps, function(step){ 
        return step._id == $scope.currentStep.step._id
    })
    $scope.currentIndex.idx = currentIdx;
    $scope.$parent.currentIndex.idx = currentIdx;

	console.log($scope.step);

	$scope.trustUrl = function(url) {
		return $sce.trustAsResourceUrl(url);
	}
})