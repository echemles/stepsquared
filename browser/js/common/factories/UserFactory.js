app.factory('UserFactory', function($http, AuthService){
    var UserFactory = {};

    UserFactory.fetchAll = function(){
        return $http.get('/api/users/')
        .then(function(users){
            return users.data
        })
    }

    function getData(response){
        return response.data
    }

    UserFactory.fetchOne = function(user_id){
        return $http.get('/api/users/'+ user_id)
        .then(getData);
    }

    UserFactory.fetchGrocery = function(user_id){
        return $http.get('/api/users/'+ user_id + '/grocery')
        .then(getData);
    }

    UserFactory.updateUser = function(user){
        return $http.put('/api/users/' + user._id, user)
        .then(getData);
    }

    UserFactory.updateGrocery = function(list, userId){
        return $http.put('/api/users/grocery/' + userId, list)
        .then(getData);
    }

    UserFactory.deleteUser = function(user_id){
        return $http.delete('/api/users/' + user_id)
        .then(function(){
            return "User successfully deleted"
        });
    }

    UserFactory.getFavorites = function(user_id){
        return $http.get('/api/users/' + user_id + '/favorites')
        .then(getData);
    }

    UserFactory.getTutorials = function(user_id){
        return $http.get('/api/users/' + user_id + '/tutorials')
        .then(getData);
    }

    UserFactory.addFavorite = function(user_id, tutorial_id){
        return $http.post('/api/users/' + user_id + '/favorites/' + tutorial_id)
        .then(function(){
            return AuthService.getLoggedInUser(true)
        })
    }

    UserFactory.removeFavorite = function(user_id, tutorial_id){
        return $http.delete('/api/users/' + user_id + '/favorites/' + tutorial_id)
        .then(function(){
            return AuthService.getLoggedInUser(true)
        })
    }

    UserFactory.follow = function(user_id, to_follow_id){
        return $http.post(`/api/users/${user_id}/follow/${to_follow_id}`)
        .then(getData)
    }

    UserFactory.unfollow = function(user_id, to_unfollow_id){
        return $http.delete(`/api/users/${user_id}/unfollow/${to_unfollow_id}`)
        .then(getData)
    }


    return UserFactory;
})

