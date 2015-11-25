app.factory('TutorialFactory', function($http, $q){
    var TutorialFactory = {};

    function getData(response){
        return response.data;
    }

    function favoritesAll(tutorials){
        var tutorialPromises = tutorials.map(function(tutorial){
            return TutorialFactory.getFavorites(tutorial._id)
            .then(function(favs){
                tutorial.favorites = favs;
                return tutorial
            })
        })
        return $q.all(tutorialPromises)
    }

    TutorialFactory.fetchAll = function(){
        return $http.get('/api/tutorials/')
        .then(getData).then(favoritesAll)
    }


    TutorialFactory.fetchByUser = function(userId){
        return $http.get('/api/tutorials/user/' + userId)
        .then(getData).then(favoritesAll)
    }

    TutorialFactory.fetchOne = function(tutorialId){
        return $http.get('/api/tutorials/'+ tutorialId)
        .then(getData)
        .then(function(tutorial){
            return TutorialFactory.getFavorites(tutorial._id)
            .then(function(favs){
                tutorial.favorites = favs;
                return tutorial;
            })
        })
    }

    TutorialFactory.search = function(searchTerm) {
        return $http.get('/api/tutorials/search/' + searchTerm)
        .then(getData).then(favoritesAll)
    }


    TutorialFactory.update = function(tutorial){
        return $http.put('/api/tutorials/' + tutorial._id, tutorial)
        .then(getData);
    }


    TutorialFactory.delete = function(tutorialId){
        return $http.delete('/api/tutorials/' + tutorialId)
        .then(function(){
            return "Tutorial successfully deleted"
        });
    }

    TutorialFactory.create = function(tutorial) {
        return $http.post('/api/tutorials/', tutorial)
        .then(getData)
    }

    TutorialFactory.getUnits = function(tutorial) {
        return $http.get('/api/tutorials/units')
        .then(getData)
    }

    TutorialFactory.getFavorites = function(tutorialId){
        return $http.get('/api/tutorials/' + tutorialId + '/favorites')
        .then(getData)
    }


    return TutorialFactory;
})

