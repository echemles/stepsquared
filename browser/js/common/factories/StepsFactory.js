app.factory('StepsFactory', function($http){
	var StepsFactory = {};

	function getData(response){
		return response.data;
	}

	StepsFactory.getStep = function(stepId){
		return $http.get('/api/steps/' + stepId)
		.then(getData)
	}

	StepsFactory.deleteStep = function(tutorialId, stepId) {
		return $http.delete('/api/steps/tutorial/'+tutorialId+'/step/'+stepId)
		.then(getData)
	}

	//MUST INCLUDE a tutorialID, and optional index;
	StepsFactory.createStep = function(stepInfo){
		return $http.post('/api/steps/', stepInfo)
		.then(getData)
	}

	StepsFactory.updateStep = function(stepInfo){
		return $http.put('/api/steps/'+ stepInfo._id, stepInfo)
		.then(getData)
	}

	return StepsFactory;
})




















