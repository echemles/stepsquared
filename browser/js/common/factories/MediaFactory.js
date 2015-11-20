app.factory('MediaFactory', function($http){

	var MediaFactory = {};


	MediaFactory.getAll = function(mediaId){
		return $http.get('/api/media/')
		.then(function(res){
			return res.data
		})
	}

	MediaFactory.getOne = function(mediaId){
		return $http.get('/api/media/' + mediaId)
		.then(function(res){
			return res.data
		})
	}

	MediaFactory.delete = function(mediaId) {
		return $http.delete('/api/media/'+mediaId)
		.then(function(res){
			return "Media successfully deleted"
		})
	}

	MediaFactory.create = function(media){
		return $http.post('/api/media/', media)
		.then (function(res){
			return res.data;
		})
	}

	MediaFactory.updateStep = function(media){
		return $http.put('/api/media/'+ media._id, media)
		.then (function(res){
			return res.data;
		})
	}

	return MediaFactory;
})




















