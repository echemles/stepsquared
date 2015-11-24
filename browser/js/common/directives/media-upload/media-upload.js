app.directive('mediaUpload', function(){
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
			scope.upload = function(file){

				// return url;
				scope.isUploading.isUploading = true;
				// scope.media.push({url: url})
				// MediaFactory.upload(file)
				// .then(function(){
				// 	scope.isUploading.isUploading = false;
					// scope.media = 
					
				// })
			}
			scope.getTypes = function(){
				var res = [];
				scope.types.forEach(function(type){
					res.push(type + '/*')
				})
				return res.join(' ')
			}
		}
	}
})




