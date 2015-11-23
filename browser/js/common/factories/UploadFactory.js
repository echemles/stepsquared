app.factory('UploadFactory', function($http){
	var UploadFactory = {};
	UploadFactory.uploadMedia = function(file) {
		$http.post('/api/upload/', file)
		.then(function(response){
			return response.data;
		})
	}
	return UploadFactory;
})