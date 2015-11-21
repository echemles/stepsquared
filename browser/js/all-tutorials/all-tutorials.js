app.config(function($stateProvider){
	$stateProvider.state('AllTutorials', {
		url: '/tutorials?userId',
		templateUrl: 'js/all-tutorials/all-tutorials.html',
		controller: 'AllTutorialsCtrl',
		resolve: {
			tutorials: function($stateParams, TutorialFactory, $location){
				console.log("Here are the stateparams outside of if/else", $stateParams)
				if($stateParams.userId){
					console.log("Here are the stateparams with userId", $stateParams)
					return TutorialFactory.fetchByUser($stateParams.userId)
				}
				else{
					return TutorialFactory.fetchAll()
				}
			},
			user: function($stateParams, UserFactory){
				if($stateParams.userId) {
					return UserFactory.fetchOne($stateParams.userId)
				}
				else {
					return null;
				}
			}
		}
	})
})


app.controller('AllTutorialsCtrl', function($scope, tutorials, user, $stateParams){
	console.log("Here are the stateparams", $stateParams)
	$scope.tutorials = tutorials;
	$scope.user = user;
	$scope.title = $scope.user ? $scope.user.firstName: "All Tutorials";
})

