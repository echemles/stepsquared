app.config(function ($stateProvider) {

    $stateProvider.state('grocery', {
        url: '/grocery',
        templateUrl: 'js/grocery/grocery.html',
        controller: 'GroceryCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });

});

app.controller('GroceryCtrl', function (currentUser, growl, $scope, UserFactory) {
    UserFactory.fetchOne(currentUser._id)
        .then(function(user){
            $scope.grocery = user.grocery;
        })
        .catch(function(err){
            growl.error('List not available', err)
        });
});





































