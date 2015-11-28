app.factory('MediaFactory', function($http){
	var MediaFactory = {};

	function getData(response){
		return response.data;
	}

	MediaFactory.getAll = function(){
		return $http.get('/api/media/')
		.then(getData)
	}

	MediaFactory.getOne = function(mediaId){
		return $http.get('/api/media/' + mediaId)
		.then(getData)
	}

	MediaFactory.delete = function(mediaId) {
		return $http.delete('/api/media/'+mediaId)
		.then(getData)
	}

	MediaFactory.create = function(media){
		return $http.post('/api/media/', media)
		.then(getData)
	}

	MediaFactory.update = function(media){
		return $http.put('/api/media/'+ media._id, media)
		.then(getData)
	}

	return MediaFactory;
})




















