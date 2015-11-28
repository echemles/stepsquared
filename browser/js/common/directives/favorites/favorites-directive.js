app.directive('favorites', function(lodash){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/favorites/favorites-directive.html',
		scope: {
			user: '=',
			tutorials: '='
		},
		link: function(scope){
			scope.onRemove = function(tutorial){
				lodash.pull(scope.tutorials, tutorial)
			}
		}
	}
})