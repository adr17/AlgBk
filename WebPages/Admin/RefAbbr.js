
//API
var webApi = "http://localhost:41516/api/";

//Directive RefAbbr
window.app.directive('adminAbbr', function () {
    return {
        restrict: 'A',
        templateUrl: 'RefAbbr.html',
        scope: {},
    };
});

window.app.factory('getAllAbbreviations', ['$http', '$q', function ($http, $q) {
    var postRegUserUrl = webApi + 'abbr';
    var deferred = $q.defer();

    $http({
        method: 'GET',
        url: webApi + 'RefDataAbbr'
    }).
       success(function (data, status, headers, config) {
           deferred.resolve(data)
       }).
       error(function (data, status) {
           deferred.reject(data);
       });
    return deferred.promise;

}]);


window.app.factory('putRefAbbrsService', ['$http', '$q', function ($http, $q) {

    var putResponse = function (Id, refAbbr) {
        if (Id) {
            // PUT api/Users/5
            var putRefAbbrURL = webApi + 'RefDataAbbr/' + Id;
            return $http({
                url: putRefAbbrURL,
                method: "Put",
                data: refAbbr
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { putResponse: putResponse };

}]);


window.app.factory('postRefAbbrsService', ['$http', function ($http) {

    var postResponse = function (data) {
        if (data) {
            // POST api/Users/5
            var putRefAbbrURL = webApi + 'RefDataAbbr/';
            return $http({
                url: putRefAbbrURL,
                method: "POST",
                data: data
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { postResponse: postResponse };

}]);



window.app.factory('deleteRefAbbrsService', ['$http', function ($http) {

    var deleteResponse = function (Id) {
        if (Id) {
            // DELETE api/RefDataAbbr/5
            var deleteRefAbbrURL = webApi + 'RefDataAbbr/' + Id;
            return $http({
                url: deleteRefAbbrURL,
                method: "DELETE"
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { deleteResponse: deleteResponse };

}]);


window.app.controller('refAbbrController', function ($scope, $http, getAllAbbreviations, putRefAbbrsService, postRefAbbrsService, deleteRefAbbrsService) {
    $scope.getAllAbbreviations = getAllAbbreviations;
    $scope.putRefAbbrsService = putRefAbbrsService;

    $scope.refAbbrs = [];
    init();

    function init() {

        //Set up empty model for Add

        $scope.refAbbr = {};
        $scope.refAbbr.Id = 0;
        $scope.refAbbr.Code = "";
        $scope.refAbbr.Description = "";


        $scope.getAllAbbreviations.then(
            function (data) {
                $scope.refAbbrs = data;
            }, function (error) {
            }
            );
    }



    $scope.putrefAbbrs = function (Id, refAbbr) {
        $scope.putRefAbbrsService = putRefAbbrsService.putResponse(Id, refAbbr);
        $scope.putRefAbbrsService.then(function (response) {
            if (response && response.status === 204)
                OnUpdateComplete(response);
            else
                OnError(response);
        });

    };

    $scope.postrefAbbrs = function (refAbbr) {

        $scope.postRefAbbrsService = postRefAbbrsService.postResponse(refAbbr);
        $scope.postRefAbbrsService.then(function (response) {
            if (response && response.status === 201)
                OnUpdateComplete(response);
            else
                OnError(response);
        });

    };

    $scope.deleteAbbr = function (Id) {
        if (Id) {
            var r = confirm("Do you want to Delete this ?");
            if (r == true) {
                // DELETE api/RefDataAbbr/5
                $scope.deleteRefAbbrsService = deleteRefAbbrsService.deleteResponse(Id);
                $scope.deleteRefAbbrsService.then(function (response) {
                    if (response && response.status === 200)
                        OnUpdateComplete(response);
                    else
                        OnError(response);
                });
            }
        }

    }


    $scope.submitAbbr = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            $scope.postrefAbbrs($scope.refAbbr);
        }

    };
    var deafualtForm = {
        Id: '',
        Code: '',
        Description: ''
    }

    var OnUpdateComplete = function (response) {
        if (response.status == 204) {
            $scope.successMessage = "Updated!!";
        }

        if (response.status == 201) {
            $scope.successMessage = "Added!!";
            $scope.addAbbrForm.$setPristine();
            $scope.refAbbr = angular.copy(deafualtForm);

        }

        if (response.status == 200) {
            $scope.successMessage = "Deleted!!";
        }
    };


    var OnError = function (response) {
        if (response && response.status === 404) {
            $scope.errorMessage = "Resource Cannot be found";
        }

        if (response && response.statusText == "Not Found") {
            $scope.errorMessage = "Cannot load data";
        } else {
            $scope.errorMessage = "The following error was received from the server- " + response.status + ' - ' + response.data.ExceptionType;
        }
    };

    // Table Control
    $scope.editRow = function (field) {
        $scope.editing = $scope.refAbbrs.indexOf(field);
        $scope.editField = angular.copy(field);
    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {

            $scope.putrefAbbrs($scope.refAbbrs[index].Id, $scope.refAbbrs[index]);
            $scope.editing = false;
        }
    }

    $scope.cancel = function (index) {
        if ($scope.editing !== false) {
            $scope.refAbbrs[$scope.editing] = $scope.editField;
            $scope.editing = false;
        }
    }
});