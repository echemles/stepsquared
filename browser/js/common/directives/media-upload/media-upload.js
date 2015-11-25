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
			    xhr.onload = function(data) {
			    	scope.isUploading.isUploading = false;
			        if (xhr.status === 200) {
			            
			            console.log("Uploaded file: ", data)
			            if(imageRegex.test(file.type))
			            	scope.media.type='image';
			            else if (videoRegex.test(file.type))
			            	scope.media.type='video';
			            
			            scope.media.url = url
			            console.log("MEDIA DIRECTIVE BEFORE IF", scope.media)
			            if(!scope.media._id) {
			            	MediaFactory.create(scope.media)
			            	.then(function(media) {
			            		return scope.updateMedia({media: media._id});
			            	})
			            	.then(function(media) {
			            		growl.success('Successfully uploaded media!')
			            	})
			            	.catch(function(err) {
			            		growl.error('Sorry, error in uploading media')
			            	})
			       		}
			       		else {
			       			MediaFactory.update(scope.media)
			       			.then(function(media) {
			       				growl.success('Successfully uploaded media!')
			       			})
			       			.catch(function(err) {
			       				growl.error('Sorry, error in uploading media')
			       			})
			       		}
			        }
			    };
			    xhr.onerror = function(err) {
			    	scope.isUploading.isUploading = false;
			    	growl.error('Error uploading file to S3')
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




