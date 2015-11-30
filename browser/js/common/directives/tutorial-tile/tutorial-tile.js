app.directive('tutorialTile', function(UserFactory, lodash, $state){
	return {
		element: 'E',
		templateUrl: 'js/common/directives/tutorial-tile/tutorial-tile.html',
		scope: {
			tutorial: '=',
			user: '=',
			onRemove: '&'
		},
		link: function(scope, element){
			scope.addFavorite = function(){
				UserFactory.addFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
					scope.tutorial.favorites +=1;
				})
			}

			scope.backgroundImage = `url(${scope.tutorial.media.url})`

			scope.hideInfo = false;
			scope.showInfo = function(){
				scope.hideInfo = false;
			}

			scope.removeInfo = function(){
				scope.hideInfo = false;
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