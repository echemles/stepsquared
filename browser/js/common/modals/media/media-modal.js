app.factory('MediaModal', function(MediaFactory){
	return function(){
		return{
			animation: true,
			templateUrl: 'js/common/modals/media/media-modal.html',
			size: 'lg'
		}
	}

})
