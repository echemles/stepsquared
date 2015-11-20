app.factory('CategoryFactory', function($http){

	var CategoryFactory = {};

	CategoryFactory.getOne = function(categoryId){
		return $http.get('/api/categories/' + categoriesId)
		.then(function(res){
			return res.data
		})
	}

	CategoryFactory.delete = function(categoryId) {
		return $http.delete('/api/categories/'+categoryId)
		.then(function(res){
			return "categories successfully deleted"
		})
	}

	CategoryFactory.create = function(category){
		return $http.post('/api/categories/', category)
		.then (function(res){
			return res.data;
		})
	}

	CategoryFactory.update = function(category){
		return $http.put('/api/categories/'+ category._id, category)
		.then (function(res){
			return res.data;
		})
	}

	return CategoryFactory;
})



