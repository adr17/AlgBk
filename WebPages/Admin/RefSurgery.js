
//API
var webApi = "http://localhost:41516/api/";

//Directive RefSurgery
window.app.directive('adminSurgery', function () {
    return {
        restrict: 'A',
        templateUrl: 'RefSurgery.html',
        scope: {},
    };
});

window.app.factory('getAllSurgeriesService', ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: webApi + 'RefDataSurgery'
    }).
       success(function (data, status, headers, config) {
           deferred.resolve(data)
       }).
       error(function (data, status) {
           deferred.reject(data);
       });
    return deferred.promise;

}]);


window.app.factory('putRefSurgeryService', ['$http', '$q', function ($http, $q) {

    var putResponse = function (Id, RefSurgery) {
        if (Id) {
            // PUT api/Users/5
            var putRefSurgeryURL = webApi + 'RefDataSurgery/' + Id;
            return $http({
                url: putRefSurgeryURL,
                method: "Put",
                data: RefSurgery
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { putResponse: putResponse };

}]);


window.app.factory('postRefSurgeryService', ['$http', function ($http) {

    var postResponse = function (data) {
        if (data) {
            // POST api/Users/5
            var putRefAbbrURL = webApi + 'RefDataSurgery/';
            return $http({
                url: putRefAbbrURL,
                method: "POST",
                data: data
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { postResponse: postResponse };

}]);



window.app.factory('deleteRefSurgeryService', ['$http', function ($http) {

    var deleteResponse = function (Id) {
        if (Id) {
            // DELETE api/RefDataAbbr/5
            var deleteRefAbbrURL = webApi + 'RefDataSurgery/' + Id;
            return $http({
                url: deleteRefAbbrURL,
                method: "DELETE"
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { deleteResponse: deleteResponse };

}]);


window.app.controller('refSurgeryController', function ($scope, $http, getAllSurgeriesService, putRefSurgeryService, postRefSurgeryService, deleteRefSurgeryService) {
    $scope.getAllSurgeriesService = getAllSurgeriesService;
    $scope.refAbbrs = [];
    init();

    function init() {

        //Set up empty model for Add

        $scope.refSurgery = {};
        $scope.refSurgery.Id = 0;
        $scope.refSurgery.Type = "";
        loadData();

    }

    function loadData() {
        $scope.getAllSurgeriesService.then(
           function (data) {
               $scope.refSurgeries = [];
               $scope.refSurgeries = data;
           }, function (error) {
               OnError(error);
           }
           );
    }

    $scope.putrefAbbrs = function (Id, refSurgery) {
        $scope.putRefSurgeryService = putRefSurgeryService.putResponse(Id, refSurgery);
        $scope.putRefSurgeryService.then(function (response) {
            if (response && response.status === 204)
                OnUpdateComplete(response);
            else
                OnError(response);
        });

    };

    $scope.postRefSurgery = function (refSurgery) {

        $scope.postRefSurgeryService = postRefSurgeryService.postResponse(refSurgery);
        $scope.postRefSurgeryService.then(function (response) {
            if (response && response.status === 201) {
                $scope.refSurgery.Id = 0;
                $scope.refSurgery.Type = "";
                OnUpdateComplete(response);
            }
            else
                OnError(response);
        });

    };

    $scope.deleteSuregery = function (Id) {
        if (Id) {
            var r = confirm("Do you want to Delete this ?");
            if (r == true) {
                // DELETE api/RefData/5
                $scope.deleteRefSurgeryService = deleteRefSurgeryService.deleteResponse(Id);
                $scope.deleteRefSurgeryService.then(function (response) {
                    if (response && response.status === 200) {
                        OnUpdateComplete(response);
                    }
                    else
                        OnError(response);
                });
            }
        }
    }

    $scope.submitSurgery = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            $scope.postRefSurgery($scope.refSurgery);
        }

    };

    var OnUpdateComplete = function (response) {
        if (response.status == 204) {
            $scope.successMessage = "Updated!!";
        }

        if (response.status == 201) {
            $scope.successMessage = "Added!!";
            $scope.refSurgery = {};
        }

        if (response.status == 200) {
            $scope.successMessage = "Deleted!!";
        }
        loadData();
    };


    var OnError = function (response) {
        if (response && response.status === 404) {
            $scope.errorMessage = "Resource Cannot be found";
        }

        if (response && response.statusText == "Not Found") {
            $scope.errorMessage = "Cannot load data";
        } else if (response && response.status) {
            $scope.errorMessage = "The following error was received from the server- " + response.status + ' - ' + response.data.ExceptionType;
            return;
        } else if (response && response.message) {

            $scope.errorMessage = "The following error was received from the server- " + response.message;
        } else {
            $scope.errorMessage = "There was a server error";
        }


    };

    // Table Control
    $scope.editRow = function (field) {
        $scope.editing = $scope.refSurgeries.indexOf(field);
        $scope.editField = angular.copy(field);
    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {

            $scope.putrefAbbrs($scope.refSurgeries[index].Id, $scope.refSurgeries[index]);
            $scope.editing = false;
        }
    }

    $scope.cancel = function (index) {
        if ($scope.editing !== false) {
            $scope.refSurgeries[$scope.editing] = $scope.editField;
            $scope.editing = false;
        }
    }
});