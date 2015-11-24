app.directive('mediaUpload', function(UploadFactory){
	return {
		restrict: 'E',
		scope: {
			media: '=',
			isUploading: '=',
			types: '='
		},
		templateUrl: 'js/common/directives/media-upload/media-upload.html',
		link: function(scope){
			scope.media = scope.media ? scope.media : {};

			scope.getTypes = function(){
				var res = [];
				scope.types.forEach(function(type){
					res.push(type + '/*')
				})
				return res.join(' ')
			}

			var newMedia = document.querySelector("#uploadMedia");

			function upload_file(file, signed_request, url){
			    var xhr = new XMLHttpRequest();
			    xhr.open("PUT", signed_request);
			    xhr.setRequestHeader('x-amz-acl', 'public-read');
			    xhr.onload = function(data) {
			    	scope.isUploading.isUploading = false;
			        if (xhr.status === 200) {
			            console.log("Uploaded file: ", data)
			            scope.media = data;
			            console.log("set the current things media to the returned url")
			        }
			    };
			    xhr.onerror = function(err) {
			    	scope.isUploading.isUploading = false;
			        console.log("ERROR: ", err)
			    };
			    xhr.send(file);
			}

			newMedia.onchange = function(event){
				// var bucket = new AWS.S3({params: {Bucket: 'trikshot'}});
				scope.isUploading.isUploading = true;
				var media = event.target.files[0];
				UploadFactory.uploadMedia(media)
				.then(function(signedURL){
					console.log("signedURL is ", signedURL)
					upload_file(media, signedURL.signed_request, signedURL.url)
				})
			}

		}
	}
})




