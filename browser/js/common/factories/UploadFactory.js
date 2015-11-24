app.factory('UploadFactory', function($http){
	var UploadFactory = {};
	UploadFactory.uploadMedia = function(media) {
		console.log(media)
		return $http.post('/api/upload/', {name: media.name, type: media.type})
		.then(function(response){
			return response.data;
		})
	}
	return UploadFactory;
})