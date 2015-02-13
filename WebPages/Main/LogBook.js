

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});


window.app.controller('mainController', function ($scope, $http, menuData, $timeout) {
    $scope.menuData = menuData;
    init();
    var timeout = null;


    function init() {
        $scope.headerText = "Log book entry form";
        $scope.LogBook = {};
        //$scope.LogBook.Date = "";
        // $scope.LogBook.MRN = "";
        //$scope.LogBook.Procedure = "";
        //$scope.LogBook.Assist = "";
        //$scope.LogBook.Supervised = "";
        //$scope.LogBook.TeachingByTrainee = "";
        //$scope.LogBook.Comments = "";
        //$scope.LogBook.RefSurgeryId = "";
        //$scope.LogBook.UserId = "";
    }

    var debounceSaveUpdates = function (newVal, oldVal) {
        console.writeline('new value-' + newVal + 'Old value-' + oldVal);
        if (newVal != oldVal) {
            if (timeout) {
                $timeout.cancel(timeout)
            }
            timeout = $timeout(saveUpdates, 1000);  // 1000 = 1 second
        }
    };

    $scope.$watch('LogBook.MRN', debounceSaveUpdates);

});