app.factory('TutorialFactory', function($http){
    var TutorialFactory = {};

    function getData(response){
        return response.data;
    }


    TutorialFactory.fetchAll = function(){
        return $http.get('/api/tutorials/')
        .then(getData)
    }

    TutorialFactory.fetchByUser = function(userId){
        return $http.get('/api/tutorials/user' + userId)
        .then(getData)
    }

    TutorialFactory.fetchOne = function(tutorialId){
        return $http.get('/api/tutorials/'+ tutorialId)
        .then(getData);
    }

    TutorialFactory.search = function(searchTerm) {
        return $http.get('/api/tutorials/search/' + searchTerm)
        .then(getData)
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


    return TutorialFactory;
})

