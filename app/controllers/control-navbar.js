"use strict";

app.controller("navbarCtrl", function($rootScope, $scope, $window, $location, $q, $http, userFactory, ezfb){



    console.log("navbarCtrl activated");

    // $scope.loginClicked = function () {
    //     userFactory.doLogIn();
    // };

    $scope.logoutClicked = function () {
        userFactory.doLogout();
        $rootScope.showLogoutButton = false;
    };

    // firebase.auth().onAuthStateChanged(function(user) {
    //     console.log("control-navbar firebase user:", user);
    // });

    // $scope.statCheck = function () {
    //     console.log("statCheck activated");
    //     userFactory.factoryCheckStatus();
    // };

    // $scope.firebaseCheck = function () {
    //     let firebaseUserinfo = userFactory.getFirebaseUser();
    //     console.log("firebaseUserinfo:", firebaseUserinfo);
    //     console.log("firebaseUserinfo.uid:", firebaseUserinfo.uid);
    // };


});
