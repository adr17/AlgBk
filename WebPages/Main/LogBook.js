

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});


window.app.controller('mainController', function ($scope, $http, menuData) {
    $scope.menuData = menuData;
    init();

    function init() {
        $scope.headerText = "Main Controller";
        $scope.LogBook = {};
        $scope.LogBook.Date = "";
        $scope.LogBook.MRN = "";
        $scope.LogBook.Procedure = "";
        $scope.LogBook.Assist = "";
        $scope.LogBook.Supervised = "";
        $scope.LogBook.TeachingByTrainee = "";
        $scope.LogBook.Comments = "";
        $scope.LogBook.RefSurgeryId = "";
        $scope.LogBook.UserId = "";
    }



});