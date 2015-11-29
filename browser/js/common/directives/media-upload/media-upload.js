app.directive('mediaUpload', function(UploadFactory, MediaFactory, growl){
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
			if(!scope.media) {
				scope.media = {};
			}

			scope.trueUpdateMedia = function() {
				scope.isUploading.isUploading = true;
				var media = event.target.files[0];
				console.log("media",media);
				UploadFactory.uploadMedia(media)
				.then(function(signedURL){
					upload_file(media, signedURL.signed_request, signedURL.url)
				})
			}

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
			scope.percentage = 0;

			function upload_file(file, signed_request, url){
				var xhr = new XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(e) {
			        if (e.lengthComputable) {
			          scope.percentage = Math.round((e.loaded * 100) / e.total);
			          scope.$digest();
			        }
			      }, false);

				xhr.open("PUT", signed_request);
				xhr.setRequestHeader('x-amz-acl', 'public-read');
				xhr.onload = function() {
			    	scope.isUploading.isUploading = false;
			    	if (xhr.status === 200){
			    		console.log("COMPLETED", url)
			        	scope.media.url = url
			    		scope.updateMedia({media: scope.media})
			    		.then(function() {
			    			return MediaFactory.update(scope.media)
			    		})
			    		.then(function() {
			    			growl.success('Successfully uploaded media')
			    		})
			    		.catch(function(err) {
			    			growl.error(err);
			    		})
			    	}
				};
				xhr.onerror = function(err) {
			    	scope.isUploading.isUploading = false;
			    	console.error(err)
				};
				xhr.send(file);
			}

			// newMedia.onchange = function(event){
				
			// }

		}
	}
})




