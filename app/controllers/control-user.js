"use strict";

console.log("control-user.js");

app.controller("userCtrl", function($scope, $window, $location, $q, $http, userFactory, eventFactory, ezfb){
    $scope.loginClicked = function () {
        userFactory.doLogIn()
        .then(function (resultFromLogin) {
          console.log("resultFromLogin:", resultFromLogin);

        });
    };
});



