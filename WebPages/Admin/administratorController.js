

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});


window.app.controller('adminController', function ($scope, $http, menuData) {
    $scope.headerText = "Admin Controller";



    $scope.menuData = menuData;
    // Menu changers
    $scope.menuChange = function (str) {
        $scope.menuData.abbrHideShow = false;
        $scope.menuData.surgeryHideShow = false;
        $scope.menuData.abbrShow = false;
        $scope.menuData.usersShow = true;

        if (str == 'abbr') {
            $scope.menuData.abbrHideShow = true;
            $scope.menuData.abbrShow = true;
        }

        if (str == 'surgery') {
            $scope.menuData.surgeryHideShow = true;
        }

        if (str == 'users') {
            $scope.menuData.usersShow = true;
        }
    };

});