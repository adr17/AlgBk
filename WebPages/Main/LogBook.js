

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});

window.app.factory('postLogBookService', ['$http', function ($http) {

    var postResponse = function (data) {
        if (data) {
            // POST api/LogBook
            var putUrl = webApi + 'LogBook';
            return $http({
                url: putUrl,
                method: "POST",
                data: data
            }).then(function (response) { return response; }, function (response) { return response; });
        }

    };
    return { postResponse: postResponse };

}]);

window.app.controller('mainController', function ($scope, $http, menuData, $timeout, getAllSurgeriesService, postLogBookService) {
    $scope.getAllSurgeriesService = getAllSurgeriesService;
    init();
    loadData();
    var timeout = null;

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

    //,[Date]
    // ,[MRN]
    // ,[Procedure]
    // ,[Indication]
    // ,[Assist]
    // ,[Supervised]
    // ,[Unsupervised]
    // ,[TeachingByTrainee]
    // ,[Comments]
    // ,[UsersId]
    // ,[RefSurgeryId]
    // ,[Deleted]
    // ,[Created]
    // ,[Modified]


    function init() {
        $scope.headerText = "form";
        $scope.watchtest = "";
        $scope.LogBook = {};
        $scope.LogBook.Date = "";
        $scope.LogBook.MRN = "";
        $scope.LogBook.Indication = "";
        $scope.LogBook.Assist = false;
        $scope.LogBook.Indication = "";
        $scope.LogBook.Supervised = false;
        $scope.LogBook.Unsupervised = "";
        $scope.LogBook.TeachingByTrainee = "";
        $scope.LogBook.Comments = "";
        $scope.LogBook.Procedure = "";
        $scope.LogBook.RefSurgeryId = "";
        $scope.LogBook.UsersId = 1;
    }


    $scope.submitForm = function (isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            $scope.postLogBook();
        }
    };

    var ValidateModel = function () {

    };

    $scope.postLogBook = function () {

        $scope.postLogBookService = postLogBookService.postResponse($scope.LogBook);
        $scope.postLogBookService.then(function (response) {

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
            $scope.successMessage = "Log Submitted";

        }

        if (response.status == 200) {
            $scope.successMessage = "Deleted!!";
        }

    };

    $scope.ClearForm = function () { init(); };

    $scope.$watch('LogBook.MRN', function () {
        //if (timeout) {
        //    $timeout.cancel(timeout)
        //}
        if (!$scope.LogBook.Date)
            $scope.LogBook.Date = new Date;
        // timeout = $timeout(saveUpdates, 1000);

    }, true);



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