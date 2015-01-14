
window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});

window.app.controller('adminController', function ($scope, $http,menuData) {
    $scope.headerText = "Admin Controller";

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




});