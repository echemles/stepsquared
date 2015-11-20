app.factory('CategoryFactory', function($http){

	var CategoryFactory = {};

	function getData(response){
		return response.data;
	}

	CategoryFactory.getOne = function(categoryId){
		return $http.get('/api/categories/' + categoryId)
		.then(getData)
	}

	CategoryFactory.delete = function(categoryId) {
		return $http.delete('/api/categories/' + categoryId)
		.then(function(){
			return "categories successfully deleted"
		})
	}

	CategoryFactory.create = function(category){
		return $http.post('/api/categories/', category)
		.then(getData)
	}

	CategoryFactory.update = function(category){
		return $http.put('/api/categories/'+ category._id, category)
		.then(getData)
	}

	return CategoryFactory;
})



