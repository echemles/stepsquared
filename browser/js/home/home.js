app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope){
	// Get some required handles
	var startRecBtn = document.getElementById('startRecBtn');
	var stopRecBtn = document.getElementById('stopRecBtn');

	var rec = new webkitSpeechRecognition();
	rec.continuous = true;
	rec.interimResults = true;
	rec.lang = 'en';

	// Define a threshold above which we are confident(!) that the recognition results are worth looking at 
	var confidenceThreshold = 0.5;

	// Simple function that checks existence of s in str
	var userSaid = function(str, s) {
		return str.indexOf(s) > -1;
	}

	// Process the results when they are returned from the recogniser
	rec.onresult = function(e) {
		console.log("got event ", e)
		// Check each result starting from the last one
		for (var i = e.resultIndex; i < e.results.length; ++i) {
			// If this is a final result
       		if (e.results[i].isFinal) {
       			// If the result is equal to or greater than the required threshold
       			if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
	       			var str = e.results[i][0].transcript;
	       			console.log('Recognised: ' + str);
	       			// If the user said 'video' then parse it further
	       			if (userSaid(str, 'food')) {
	       				console.log("got food")
	       				console.log(userSaid(str, 'next'))
	       				// Replay the video
	       				if (userSaid(str, 'next')) {
	       					console.log('in next')
	       					$scope.command = 'next';
	       				}
	       				// Play the video
	       				else if (userSaid(str, 'back')) {
							$scope.command = 'back';
	       				}
	       				// Stop the video
	       				else if (userSaid(str, 'help')) {
	       					$scope.command = 'help';
	       				}
	       			}
       			}
        	}
    	}
	}



	$scope.recStatus = "";
	// Start speech recognition
	var startRec = function() {
		console.log("starting recording")
		rec.start();
		$scope.recStatus = 'recognising';
	}
	// Stop speech recognition
	var stopRec = function() {
		rec.stop();
		$scope.recStatus = 'not recognising';
	}
	// Setup listeners for the start and stop recognition buttons
	startRecBtn.addEventListener('click', startRec, false);
	stopRecBtn.addEventListener('click', stopRec, false);

})