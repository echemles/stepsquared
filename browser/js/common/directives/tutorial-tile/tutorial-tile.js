app.directive('tutorialTile', function(){
	return {
		element: 'E',
		templateUrl: 'js/common/directives/tutorial-tile/tutorial-tile.html',
		scope: {
			tutorial: '='
		}
	}
})