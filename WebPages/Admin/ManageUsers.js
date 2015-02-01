
//API
var webApi = "http://localhost:41516/api/";

//Directive Users
window.app.directive('adminUsers', function () {
    return {
        restrict: 'A',
        templateUrl: 'ManageUsers.html',
        scope: {},
    };
});

window.app.factory('getAllService', ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();
    // GET api/User
    $http({
        method: 'GET',
        url: webApi + 'User'
    }).
       success(function (data, status, headers, config) {
           deferred.resolve(data)
       }).
       error(function (data, status) {
           deferred.reject(data);
       });
    return deferred.promise;

}]);


window.app.factory('putService', ['$http', '$q', function ($http, $q) {

    var putResponse = function (Id, data) {
        if (Id) {
            // PUT api/User/5
            var url = webApi + 'User/' + Id;
            return $http({
                url: url,
                method: "Put",
                data: data
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { putResponse: putResponse };

}]);


window.app.factory('postService', ['$http', function ($http) {

    var postResponse = function (users) {
        if (users) {
            // POST api/User/5
            var url = webApi + 'User/';
            return $http({
                url: url,
                method: "POST",
                data: users
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { postResponse: postResponse };

}]);



window.app.factory('deleteService', ['$http', function ($http) {

    var deleteResponse = function (Id) {
        if (Id) {
            
            var url = webApi + 'user/' + Id;
            return $http({
                url: url,
                method: "DELETE"
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { deleteResponse: deleteResponse };

}]);


window.app.controller('managerUsersController', function ($scope, $http, getAllService, putService, postService, deleteService) {
    $scope.getAllService = getAllService;
    $scope.refAbbrs = [];
    init();

    function init() {

        //Set up empty model for Add

        $scope.user = {};
        $scope.users = [];
        loadData();
    }

    function clearUser() {
        $scope.user = {};
        $scope.user.FirstName = "";
        $scope.user.LastName = "";
        $scope.user.Email = "";
        $scope.user.Address1 = "";
        $scope.user.Address2 = "";
        $scope.user.Address3 = "";
        $scope.user.Phone1 = "";
        $scope.user.Phone2 = "";
    }

    function loadData() {
        $scope.getAllService.then(
           function (data) {
               $scope.Users = [];
               $scope.Users = data;
           }, function (error) {
               OnError(error);
           }
           );
    }

    $scope.putService = function (Id, data) {
        $scope.putService = putService.putResponse(Id, data);
        $scope.putService.then(function (response) {
            if (response && response.status === 204)
                OnUpdateComplete(response);
            else
                OnError(response);
        });

    };

    $scope.postData = function (data) {

        $scope.postService = postService.postResponse(data);
        $scope.postService.then(function (response) {
            if (response && response.status === 201) {              
                OnUpdateComplete(response);               
                loadData();
            }
            else
                OnError(response);
        });

    };

    $scope.deleteData = function (Id) {
        if (Id) {
            var r = confirm("Do you want to Delete this ?");
            if (r == true) {
                // DELETE api/RefData/5
                $scope.deleteService = deleteService.deleteResponse(Id);
                $scope.deleteService.then(function (response) {
                    if (response && response.status === 200) {
                        OnUpdateComplete(response);
                    }
                    else
                        OnError(response);
                });
            }
        }
    }

    $scope.submitData = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            $scope.postData($scope.user);
        }

    };

    var OnUpdateComplete = function (response) {
        if (response.status == 204) {
            $scope.successMessage = "Updated!!";
        }

        if (response.status == 201) {
            $scope.successMessage = "Added!!";
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
        $scope.editing = $scope.Users.indexOf(field);
        $scope.editField = angular.copy(field);
    }

    $scope.saveField = function (index) {
        if ($scope.editing !== false) {

            $scope.putService($scope.Users[index].Id, $scope.Users[index]);
            $scope.editing = false;
        }
    }

    $scope.cancel = function (index) {
        if ($scope.editing !== false) {
            $scope.Users[$scope.editing] = $scope.editField;
            $scope.editing = false;
        }
    }
});