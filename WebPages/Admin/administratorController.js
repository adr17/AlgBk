

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
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
    //var deferred = $q.defer();
    //var putResponse = function (Id, refAbbr) {
    //    if (Id) {
    //        // PUT api/RefDataAbbr/5
    //        var putRefAbbrURL = webApi + 'RefDataAbbr/' + Id;
    //        $http({
    //            url: putRefAbbrURL,
    //            method: "Put",
    //            data: refAbbr
    //        }).success(function (data, status, headers, config) {
    //            deferred.resolve(data, status)
    //        }).error(function (data, status) {
    //            deferred.reject(data, status);
    //        });
    //        //return deferred.promise;
    //    }

    //};
    //return { putResponse: deferred.promise };

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


window.app.controller('adminController', function ($scope, $http, menuData, getAllAbbreviations, putRefAbbrsService) {
    $scope.headerText = "Admin Controller";
   
    $scope.getAllAbbreviations = getAllAbbreviations;
    $scope.putRefAbbrsService = putRefAbbrsService;
    $scope.refAbbrs = [];
    init();

    function init() {
        $scope.getAllAbbreviations.then(
            function (data) {
                $scope.refAbbrs = data;
            }, function (error) {
            }
            );
    }

    $scope.menuData = menuData;
    // Menu changers
    $scope.menuChange = function (str) {
        $scope.menuData.abbrHideShow = true;
        $scope.menuData.surgeryHideShow = true;

        if (str == 'abbr') {
            $scope.menuData.abbrHideShow = false;
        }

        if (str == 'surgery') {
            $scope.menuData.surgeryHideShow = false;
        }

        if (str == 'logbook') {
            $scope.menuData.logbookHideShow = false;
        }
    };


    $scope.putrefAbbrs = function (Id, refAbbr) {
        //$scope.putRefAbbrsService.putResponse(Id, refAbbr).then(
        //    function (data, status) { OnUpdateComplete(status) }, function () { }

        //    );
        //$scope.putRefAbbrsService.then(function (data, status) {
        //    if (status && status === 204)
        //        OnUpdateComplete(status);
        //    else
        //        OnError(response);
        //});

        $scope.putRefAbbrsService = putRefAbbrsService.putResponse(Id, refAbbr);
        $scope.putRefAbbrsService.then(function (response) {
            if (response && response.status === 204)
                OnUpdateComplete(response);
            else
                OnError(response);
        });

    };


    var OnUpdateComplete = function (response) {
        if (response.status == 204) {
            $scope.successMessage = "Updated!!";
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