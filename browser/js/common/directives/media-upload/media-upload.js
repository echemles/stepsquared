app.directive('mediaUpload', function(UploadFactory){
	return {
		restrict: 'E',
		scope: {
			media: '=',
			isUploading: '=',
			types: '=',
			updateMedia: '&'
		},
		templateUrl: 'js/common/directives/media-upload/media-upload.html',
		link: function(scope){

			scope.getTypes = function(){
				var res = [];
				scope.types.forEach(function(type){
					res.push(type + '/*')
				})
				return res.join(' ')
			}

			var newMedia = document.querySelector("#uploadMedia");
			var imageRegex = /.*image.*/i;
			var videoRegex = /.*video.*/i;


			function upload_file(file, signed_request, url){
			    var xhr = new XMLHttpRequest();
			    xhr.open("PUT", signed_request);
			    xhr.setRequestHeader('x-amz-acl', 'public-read');
			    xhr.onload = function(data) {
			    	scope.isUploading.isUploading = false;
			        if (xhr.status === 200) {
			            console.log("Uploaded file: ", data)
			            if(!scope.media)
			            	scope.media={};
			            if(imageRegex.test(file.type))
			            	scope.media.type='image';
			            else if (videoRegex.test(file.type))
			            	scope.media.type='video';
			            
			            scope.media.url = url

			            scope.updateMedia({media: scope.media})


			            scope.$digest()
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
				console.log("media",media);
				UploadFactory.uploadMedia(media)
				.then(function(signedURL){
					console.log("signedURL is ", signedURL)
					upload_file(media, signedURL.signed_request, signedURL.url)
				})
			}

		}
	}
})




