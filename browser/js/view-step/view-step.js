app.config(function($stateProvider){
	$stateProvider.state('viewStep', {
		url: '/view-tutorial/:tutorialId/view-step/:stepId',
		templateUrl: 'js/view-step/view-step.html',
		controller: 'ViewStepCtrl',
		params: {
			tutorial: null,
		},
		resolve: {
			theStep: function($stateParams, StepsFactory){
				console.log("in get step")
				return StepsFactory.getStep($stateParams.stepId)
			},
			theTutorial: function($stateParams, TutorialFactory){
				if(!$stateParams.tutorial) return TutorialFactory.fetchOne($stateParams.tutorialId)
				else return $stateParams.tutorial;
			}
		}
	})
})

app.controller('ViewStepCtrl',function($scope, theStep, theTutorial){
	$scope.step = theStep;
	$scope.tutorial = theTutorial;
})