app.config(function($stateProvider){
	$stateProvider.state('allTutorials', {
		url: '/tutorials?userId?searchquery',
		templateUrl: 'js/all-tutorials/all-tutorials.html',
		controller: 'AllTutorialsCtrl',
		resolve: {
			tutorials: function($stateParams, TutorialFactory, $location){
				if($stateParams.userId){
					return TutorialFactory.fetchByUser($stateParams.userId)
				}
				else if($stateParams.searchquery) {
					return TutorialFactory.search($stateParams.searchquery)
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
			},
			categories: function(CategoryFactory) {
				return CategoryFactory.getAll();
			},
			loggedInUser: function(AuthService){
				return AuthService.getLoggedInUser();
			}
		}
	})
})


app.controller('AllTutorialsCtrl', function($scope, tutorials,loggedInUser, user, categories, $stateParams){
	$scope.tutorials = tutorials;
	$scope.user = user;
	$scope.loggedInUser = loggedInUser

	if($scope.user) {
		$scope.title = $scope.user
	}
	else if ($stateParams.searchquery) {
		$scope.title = "Search Results for " + $stateParams.searchquery;
	}
	else {
		$scope.title = "All Tutorials"
	}

	$scope.categories = categories;
	$scope.selectedCategory = {name: 'All'}
	$scope.categories.unshift($scope.selectedCategory);

	$scope.categoryFilter = function() {
		if($scope.selectedCategory.name === 'All') return {};
		else {
			console.log({category: {name: $scope.selectedCategory.name}})
			return {category: {name: $scope.selectedCategory.name}};
		}
	}



})

