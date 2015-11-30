app.factory('TwilioFactory', function($http){
	var TwilioFactory = {};
	TwilioFactory.sendText = function(textMessage){
		$http.post('/api/twilio', textMessage)
		.then(function(text){
			console.log(text);
		}, function(err){
			console.error(err);
		})

	}

	return TwilioFactory;

})