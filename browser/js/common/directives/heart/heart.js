//to use add scss mixin via @include heart-icon-mixin(30px);
app.directive('heart', function(UserFactory){
	return {
		element: 'E',
		scope: {
			user: '=',
			tutorial: '=',
			displayNumberLikes: '='
		}, 
		templateUrl: 'js/common/directives/heart/heart.html',
		link: function(scope){
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
			scope.addFavorite = function(){
				UserFactory.addFavorite(scope.user._id, scope.tutorial._id)
				.then(function(user){
					scope.user = user;
					scope.tutorial.favorites +=1;
				})
			}
		}
	}
})