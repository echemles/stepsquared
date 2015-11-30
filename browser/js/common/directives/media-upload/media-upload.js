app.directive('mediaUpload', function(UploadFactory, MediaFactory, growl, $sce){
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

			var media; 
			var newMedia = document.querySelector("#uploadMedia");
			
			var imageRegex = /.*image.*/i;
			var videoRegex = /.*video.*/i;

			scope.showPreview = false;
			scope.showProgress=false;

			scope.trustUrl = function(url) {
				return $sce.trustAsResourceUrl(url);
			}


			function updateMediaDocument() {
				scope.updateMedia({media: scope.media})
	        	.then(function() {
	        		growl.success('Successfully uploaded and saved media')
	        	})
	        	.catch(function(err) {
	        		growl.error('There was an error uploading media');
	        	})
			}

			if(!scope.media) {
				scope.media = {};
			}
			else {
				scope.showPreview = true;
			}

			scope.trueUpdateMedia = function() {
				if(media) {
					if (imageRegex.test(media.type)) {
						scope.media.type = 'image'
					}
					else if (videoRegex.test(media.type)) {
						scope.media.type = 'video'
					}
					else {
						growl.error("Sorry invalid file type");
						return;
					}

					scope.isUploading.isUploading = true;
					scope.percentage = 0;
					scope.showProgress = true;


					UploadFactory.uploadMedia(media)
					.then(function(signedURL){
						upload_file(media, signedURL.signed_request, signedURL.url)
					})
					.catch(function(err){
						growl.error('There was an error uploading media');
					})
				}
				else {
					updateMediaDocument();
				}
				
			}

			scope.getTypes = function(){
				var res = [];
				scope.types.forEach(function(type){
					res.push(type + '/*')
				})
				return res.join(' ')
			}



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
			        	scope.media.url = url;
			        	updateMediaDocument();
			        	if(scope.media.type == 'video')
			        		document.getElementById('video').setAttribute('src',scope.media.url);
			        	scope.showPreview = true;
			    	}
				};

				xhr.onerror = function(err) {
			    	scope.isUploading.isUploading = false;
			    	console.error(err)
				};
				xhr.send(file);
			}

			newMedia.onchange = function(event){
				media = event.target.files[0];
			}

		}
	}
})




