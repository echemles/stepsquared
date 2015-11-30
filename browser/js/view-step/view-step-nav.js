app.config(function ($stateProvider) {
    $stateProvider.state('viewStepNav', {
        url: '/view-tutorial/:tutorialId/view-step',
        templateUrl: 'js/view-step/view-step-nav.html',
        controller: 'ViewStepNavCtrl',
        resolve: {
            currentTutorial: function(TutorialFactory, $stateParams){
                return TutorialFactory.fetchOne($stateParams.tutorialId)
            }
        }
    });

});

app.controller('ViewStepNavCtrl', function ($scope, $state, growl, currentTutorial, TutorialFactory, MediaFactory, StepsFactory) {
    $scope.tutorial = currentTutorial;

    $scope.currentIndex = {
        idx: null
    }

    $scope.currentStep = {
        step: null
    };
    
    $scope.isActive = function(idx){
        return $scope.currentIndex.idx == idx;
    }

    $scope.nextStep = function(){
        if($scope.currentIndex.idx+1 < $scope.tutorial.steps.length){
            $scope.currentStep.step = $scope.tutorial.steps[$scope.currentIndex.idx+1]
            $state.go('viewStepNav.viewStep', {stepId: $scope.currentStep.step._id})
        } else{
            growl.error("There isn't a next step! Click CREATE STEP to make a new one!")
        }
        
    }

    $scope.prevStep = function(){
        if($scope.currentIndex.idx-1 >-1){
            $scope.currentStep.step = $scope.tutorial.steps[$scope.currentIndex.idx-1]
            $state.go('viewStepNav.viewStep', {stepId: $scope.currentStep.step._id })
        } else {
            $state.go('viewTutorial', {tutorialId: $scope.tutorial._id})
        }
    }
       
});











