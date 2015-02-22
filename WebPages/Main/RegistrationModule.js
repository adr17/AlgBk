
var webApi = "http://localhost:41516/api/";

window.app.factory('postUserService', ['$http', function ($http) {

    var postResponse = function (data) {
        if (data) {
            // POST api/User
            var putUrl = webApi + 'User';
            return $http({
                url: putUrl,
                method: "POST",
                data: data
            }).then(function (response) { return response; }, function (response) { return response; });
        }
    };
    return { postResponse: postResponse };

}]);


window.app.controller('registrationController', function ($scope, $http, postUserService) {

    init();


    function init() {
        $scope.User = {};
        $scope.User.FirstName = "";
        $scope.User.LastName = "";
        $scope.User.Email = "";
        $scope.User.Password = "";
        $scope.User.Address1 = "";
        $scope.User.Address2 = "";
        $scope.User.Address2 = "";
        $scope.User.Address3 = "";
        $scope.User.Phone1 = "";
        $scope.User.Phone2 = "";
        $scope.User.TrainingSite = "";
        $scope.User.TrainingYear = "";
        $scope.User.Created = "";
        $scope.User.Deleted = 0;
    };


    $scope.submitForm = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            $scope.postRegUser();
        }
    };

    $scope.postRegUser = function () {

        $scope.postUserService = postUserService.postResponse($scope.User);
        $scope.postUserService.then(function (response) {

            if (response && response.status === 201) {
                init();
                OnUpdateComplete(response);
            }
            else
                OnError(response);
        });

    };

    var OnUpdateComplete = function (response) {
        if (response.status == 204) {
            $scope.successMessage = "Updated!!";
        }

        if (response.status == 201) {
            $scope.successMessage = "User Registered";

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
        } else if (response && response.status) {
            $scope.errorMessage = "The following error was received from the server- " + response.status + ' - ' + response.data.ExceptionType;
            return;
        } else if (response && response.message) {

            $scope.errorMessage = "The following error was received from the server- " + response.message;
        } else {
            $scope.errorMessage = "There was a server error";
        }
    };


});