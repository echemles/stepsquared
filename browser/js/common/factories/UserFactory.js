app.factory('UserFactory', function($http){
    var UserFactory = {};



    UserFactory.fetchAll = function(){
        return $http.get('/api/users/')
        .then(function(users){
            return users.data
        })
    }

    UserFactory.fetchOne = function(user_id){
        return $http.get('/api/users/'+ user_id)
        .then(function(res){
            return res.data
        });
    }


    UserFactory.updateUser = function(user){
        return $http.put('/api/users/' + user._id, user)
        .then(function(res){
            return res.data
        });
    }


    UserFactory.deleteUser = function(user_id){
        return $http.delete('/api/users/' + user_id)
        .then(function(){
            return "User successfully deleted"
        });
    }

    UserFactory.getFavorites = function(user_id){
        return $http.get('/api/users/' + user_id + '/favorites')
        .then(function(res){
            return res.data;
        });
    }

    UserFactory.getTutorials = function(user_id){
        return $http.get('/api/users/' + user_id + '/tutorials')
        .then(function(res){
            return res.data;
        });
    }


    return UserFactory;
})

