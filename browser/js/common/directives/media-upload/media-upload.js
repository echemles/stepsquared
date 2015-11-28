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
				MediaFactory.update(scope.media)
				.then(function(media) {
					growl.success('Successfully updated media')
				})
				.catch(function(err){ 
					growl.error(err);
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
				console.log("media",media);
				UploadFactory.uploadMedia(media)
				.then(function(signedURL){
					upload_file(media, signedURL.signed_request, signedURL.url)
				})
			}

		}
	}
})




