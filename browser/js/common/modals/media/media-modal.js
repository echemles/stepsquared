app.factory('MediaModal', function(MediaFactory){
	return function(media){
		return{
			animation: true,
			templateUrl: 'js/common/modals/media/media-modal.html',
			size: 'lg',
			controller: 'MediaModalCtrl',
			resolve: {
				media: function(){
					return media
				}
			}
		}
	}

})

app.controller('MediaModalCtrl', function($uibModalInstance, media, $scope, Upload){
	$scope.media = media;
	AWS.config.region = "Oregon";
	AWS.config.update({accessKeyId:'AKIAIRZOI75AZLL4GO2Q', secretAccessKey: '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'})	
	var bucket = new AWS.S3({params: {Bucket: 'step-squared-media'}});
	bucket.listObjects(function(err,data){
		if (err) console.error(err)
		console.log(data)
	})

	var policy = {"expiration": "2016-01-01T00:00:00Z",
	  "conditions": [ 
	    {"bucket": "step-squared-media"}, 
	    ["starts-with", "$key", ""],
	    {"acl": "public"},
	    {"success_action_redirect": "http://localhost/"},
	    ["starts-with", "$Content-Type", ""],
	    ["content-length-range", 0, 1048576]
	  ]
	}
	$scope.uploadS3 = function(){

		
	}

})


