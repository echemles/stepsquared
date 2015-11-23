app.config(function ($stateProvider) {
    $stateProvider.state('admin.tutorials', {
        url: '/tutorials',
        templateUrl: 'js/admin/admin-tutorials.html',
        controller: 'AdminTutorialsCtrl',
        resolve: {
            allTutorials: function(TutorialFactory) {
                  return TutorialFactory.fetchAll();                    
            }
        } 
    })
});

app.controller('AdminTutorialsCtrl', function ($scope, AuthService, allTutorials, TutorialFactory, growl) {
    
    $scope.login = {};
    $scope.error = null;

    $scope.allTutorials = allTutorials;
 

    $scope.deleteTutorial = function (index){
        TutorialFactory.delete($scope.allTutorials[index]._id)
            .then(function(){
            	$scope.allTutorials.splice(index,1);
                growl.success("Successfully deleted tutorial")
            })
            .catch(function(err) {
                growl.error("Error deleting tutorial")
            })
        }
    

});