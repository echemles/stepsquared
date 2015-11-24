app.config(function ($stateProvider){
	$stateProvider.state('tutorialStep', {
		url: '/step/',
		templateUrl: 'js/tutorial/tutorial-steps.html',
		controller: 'StepCtrl'
	});
});

app.controller('StepCtrl', function ($scope, $state){


})

