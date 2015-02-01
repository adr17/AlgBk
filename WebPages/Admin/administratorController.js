

var webApi = "http://localhost:41516/api/";


window.app.factory('menuData', function () {
    return { logBookHideShow: true, loginHideShow: false, registerHideShow: true }
});


window.app.controller('adminController', function ($scope, $http, menuData) {
    $scope.menuData = menuData;
    init();

    function init() {
        $scope.headerText = "Admin Controller";
        $scope.menuData.usersShow = true;
        $scope.menuData.surgeryHideShow = false;
        $scope.menuData.abbrShow = false;
    }

 
    // Menu changers
    $scope.menuChange = function (str) {
        $scope.menuData.usersShow = false;
        $scope.menuData.surgeryHideShow = false;
        $scope.menuData.abbrShow = false;

        if (str == 'abbr') {

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