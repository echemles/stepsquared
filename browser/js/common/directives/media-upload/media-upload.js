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
				xhr.onload = function() {
			    	scope.isUploading.isUploading = false;
			    	if (xhr.status === 200){
			        	scope.media.url = url
			    		scope.updateMedia({media: scope.media})
			    		scope.$digest()
			    	}
				};
				xhr.onerror = function(err) {
			    	scope.isUploading.isUploading = false;
			    	console.error(err)
				};
				xhr.send(file);
			}

			newMedia.onchange = function(event){
				scope.isUploading.isUploading = true;
				var media = event.target.files[0];
				UploadFactory.uploadMedia(media)
				.then(function(signedURL){
					upload_file(media, signedURL.signed_request, signedURL.url)
				})
			}

		}
	}
})




