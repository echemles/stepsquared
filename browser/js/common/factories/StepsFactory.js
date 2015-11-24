app.factory('StepsFactory', function($http){

	var StepsFactory = {};

	StepsFactory.getStep = function(stepId){
		return $http.get('/api/steps/' + stepId)
		.then(function(response){
			console.log("response data is ", response.data)
			return response.data
		})
	}

	StepsFactory.deleteStep = function(stepId) {
		return $http.delete('/api/steps/'+stepId)
		.then(function(response){
			return "Step successfully deleted"
		})
	}

	StepsFactory.createStep = function(stepInfo){
		return $http.post('/api/steps/', stepInfo)
		.then (function(response){
			return response.data;
		})
	}

	StepsFactory.updateStep = function(stepInfo){
		return $http.put('/api/steps/'+ stepInfo._id, stepInfo)
		.then (function(response){
			return response.data;
		})
	}

	return StepsFactory;
})




















