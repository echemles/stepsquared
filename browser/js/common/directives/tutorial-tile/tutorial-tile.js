app.directive('tutorialTile', function(UserFactory){
	return {
		element: 'E',
		templateUrl: 'js/common/directives/tutorial-tile/tutorial-tile.html',
		scope: {
			tutorial: '=',
			user: '='
		},
		link: function(scope){
			scope.addFavorite = function(){
				UserFactory.addFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
				})
			}
			scope.removeFavorite = function(){
				UserFactory.removeFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
				})
			}

			scope.hasFavorite = function(){
				return scope.user.favorites.indexOf(scope.tutorial._id) > -1 ? true : false
			}
		}
	}
})