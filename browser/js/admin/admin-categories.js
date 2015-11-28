app.config(function ($stateProvider) {
    $stateProvider.state('admin.categories', {
        url: '/categories',
        templateUrl: 'js/admin/admin-categories.html',
        controller: 'AdminCategoriesCtrl',
        resolve: {
            allCategories: function(CategoryFactory) {
                  return CategoryFactory.getAll();                    
            }
        } 
    })
});

app.controller('AdminCategoriesCtrl', function ($scope, allCategories, CategoryFactory, growl, $uibModal) {
    
    $scope.login = {};
    $scope.error = null;

    $scope.allCategories = allCategories;
 

    $scope.deleteCategory = function (index){
        CategoryFactory.delete($scope.allCategories[index]._id)
        .then(function(){
        	$scope.allCategories.splice(index,1);
            growl.success("Successfully deleted category")
        })
        .catch(function() {
            growl.error("Error deleting category")
        })
    }

    $scope.addCategory = function() {
        var addCatModal = $uibModal.open({
            templateUrl: 'js/admin/category-modal.html',
            controller: 'CatModalCtrl',
            windowClass: 'center-modal',
            resolve: {
                category: null
            }
        });

        addCatModal.result.then(function (newCategory) {
            $scope.allCategories.push(newCategory);
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.editCategory = function(index) {
        var editCatModal = $uibModal.open({
            templateUrl: 'js/admin/category-modal.html',
            controller: 'CatModalCtrl',
            windowClass: 'center-modal',
            resolve: {
                category: function() {
                    return $scope.allCategories[index];
                }
            }
        });

        editCatModal.result.then(function(updatedCategory) {
            $scope.allCategories[index] = updatedCategory;
        }, function(err) {
            if(err)
                growl.error(err)
            console.log('Modal dismissed at ' + new Date())
        })

    }
});

app.controller('CatModalCtrl', function ($scope, $uibModalInstance, CategoryFactory, category) {
    
    $scope.new = true; 
    
    if(category) {
        $scope.new = false;
        $scope.category = category;
    }

    $scope.ok = function () {
        if($scope.new) {
            CategoryFactory.create($scope.category)
            .then(function(newCategory) {
                $uibModalInstance.close(newCategory);
            })
            .catch(function() {
                $uibModalInstance.dismiss("Error creating category");
            })
        }
        else {
            CategoryFactory.update($scope.category)
            .then(function(updatedCategory) {
                $uibModalInstance.close(updatedCategory);
            })
            .catch(function() {
                $uibModalInstance.dismiss("Error updating category");
            })
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

});

