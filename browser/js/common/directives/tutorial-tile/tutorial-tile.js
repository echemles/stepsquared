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
			scope.backgroundImage = `url(${scope.tutorial.media.url})`
			scope.hideInfo = false;
			scope.showInfo = function(){
				scope.hideInfo = false;
			}

			scope.removeInfo = function(){
				scope.hideInfo = false;
			}
		}
	}
})