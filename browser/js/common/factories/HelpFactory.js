app.factory('HelpFactory', function($http){

	var HelpFactory = {};

	HelpFactory.getOne = function(helpId){
		return $http.get('/api/help/' + helpId)
		.then(function(res){
			return res.data
		})
	}

	HelpFactory.delete = function(helpId) {
		return $http.delete('/api/help/'+helpId)
		.then(function(res){
			return "Help successfully deleted"
		})
	}

	HelpFactory.create = function(help){
		return $http.post('/api/help/', help)
		.then (function(res){
			return res.data;
		})
	}

	HelpFactory.update = function(help){
		return $http.put('/api/help/'+ help._id, help)
		.then (function(res){
			return res.data;
		})
	}

	return HelpFactory;
})



