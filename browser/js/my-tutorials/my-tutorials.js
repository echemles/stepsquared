app.config(function($stateProvider){
	$stateProvider.state('myTutorials', {
		url: '/myTutorials',
		templateUrl: 'js/my-tutorials/my-tutorials.html',
		controller: 'MyTutorialsCtrl'
	})
})

app.controller('MyTutorialsCtrl', function($scope){
	
})