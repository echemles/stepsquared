app.directive('tutorialTile', function(UserFactory, lodash, $state){
	return {
		element: 'E',
		templateUrl: 'js/common/directives/tutorial-tile/tutorial-tile.html',
		scope: {
			tutorial: '=',
			user: '=',
			onRemove: '&'
		},
		link: function(scope){
			console.log("tutorial is ", scope.tutorial)
			scope.addFavorite = function(){
				UserFactory.addFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
					scope.tutorial.favorites +=1;
				})
			}
			scope.removeFavorite = function(){
				UserFactory.removeFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
					scope.tutorial.favorites -=1;
					if(scope.onRemove) scope.onRemove({tutorial: scope.tutorial})
				})
			}

			scope.hasFavorite = function(){
				return scope.user.favorites.indexOf(scope.tutorial._id) > -1 ? true : false
			}
		}
	}
})