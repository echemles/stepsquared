app.config(function($stateProvider){
	$stateProvider.state('viewTutorial.viewStep', {
		templateUrl: 'js/view-step/view-step.html',
		controller: 'ViewStepCtrl',
		url: '/step/:stepId',
		resolve: {
			theStep: function($stateParams, StepsFactory){
				return StepsFactory.getStep($stateParams.stepId)
			}
		}
	})
})

app.controller(function($scope, theTutorial, currentUser, theStep){
	$scope.step = theStep;

})