app.config(function ($stateProvider){
	$stateProvider.state('tutorialStep', {
		url: '/step/',
		templateUrl: 'js/tutorial/tutorial-steps.html',
		controller: 'StepCtrl'
	});
});

app.controller('StepCtrl', function ($scope, UploadFactory, $state, Upload){

	function upload_file(file, signed_request, url){
	    var xhr = new XMLHttpRequest();
	    xhr.open("PUT", signed_request);
	    xhr.setRequestHeader('x-amz-acl', 'public-read');
	    xhr.onload = function(data) {
	        if (xhr.status === 200) {
	            console.log("Uploaded file: ", data)
	        }
	    };
	    xhr.onerror = function(err) {
	        console.log("ERROR: ", err)
	    };
	    xhr.send(file);
	}
	
	var newMedia = document.querySelector("#uploadMedia");

	newMedia.onchange = function(event){
		// var bucket = new AWS.S3({params: {Bucket: 'trikshot'}});
		var media = event.target.files[0];
		UploadFactory.uploadMedia(media)
		.then(function(signedURL){
			upload_file(media, signedURL.signed_request, signedURL.url)
		})
	}
})

