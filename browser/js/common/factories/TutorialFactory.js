app.factory('TutorialFactory', function($http){
    var TutorialFactory = {};



    TutorialFactory.fetchAll = function(){
        return $http.get('/api/tutorials/')
        .then(function(res){
            return res.data
        })
    }

    TutorialFactory.fetchOne = function(tutorialId){
        return $http.get('/api/tutorials/'+ tutorialId)
        .then(function(res){
            return res.data
        });
    }

    TutorialFactory.search = function(searchTerm) {
        return $http.get('/api/tutorials/search/' + searchTerm)
        .then(function(res) {
            return res.data;
        })
    }


    TutorialFactory.update = function(tutorial){
        return $http.put('/api/tutorials/' + tutorial._id, tutorial)
        .then(function(res){
            return res.data
        });
    }


    TutorialFactory.delete = function(tutorialId){
        return $http.delete('/api/tutorials/' + tutorialId)
        .then(function(){
            return "Tutorial successfully deleted"
        });
    }

    TutorialFactory.create = function(tutorial) {
        return $http.post('/api/tutorials/', tutorial)
        .then(function(res) {
            return res.data;
        })
    }


    return TutorialFactory;
})

