app.config(function($stateProvider){
	$stateProvider.state('allTutorials', {
		url: '/tutorials?userId',
		templateUrl: 'js/all-tutorials/all-tutorials.html',
		controller: 'AllTutorialsCtrl',
		resolve: {
			tutorials: function($stateParams, TutorialFactory, $location){
				if($stateParams.userId){
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
	console.log("tutorials is ", tutorials)
	$scope.tutorials = tutorials;
	$scope.user = user;
	$scope.title = $scope.user ? $scope.user.firstName: "All Tutorials";
})

