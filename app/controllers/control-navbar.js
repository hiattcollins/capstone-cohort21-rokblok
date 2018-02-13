"use strict";

app.controller("navbarCtrl", function($rootScope, $scope, $window, $location, $q, $http, userFactory, ezfb){



    console.log("navbarCtrl activated");


    $rootScope.showLogoutButton = false;

    $scope.logoutClicked = function () {
        $rootScope.showLogoutButton = false;
        userFactory.doLogout();

    };

});
