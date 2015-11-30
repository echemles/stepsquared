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

app.controller('GroceryCtrl', function (currentUser, growl, $scope, UserFactory, TwilioFactory) {
    UserFactory.fetchOne(currentUser._id)
        .then(function(user){
            $scope.grocery = user.grocery;
        })
        .catch(function(err){
            growl.error('List not available', err)
        });


    $scope.sendText = function(){
        var groceryListToText = "";

        for(var i=0; i < $scope.grocery.length; i++){
            for(var j=0; j< $scope.grocery[i].list.length; j++){
                groceryListToText+= $scope.grocery[i].list[j].item + " ("+ $scope.grocery[i].list[j].quantity + " "+ $scope.grocery[i].list[j].unit+ ") " + "\n"
            }
        }
        TwilioFactory.sendText({groceryList: groceryListToText})
    }


});





































