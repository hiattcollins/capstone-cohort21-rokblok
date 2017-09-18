"use strict";

app.controller("navbarCtrl", function($scope, $window, $location, $q, $http, userFactory, ezfb){



    console.log("navbarCtrl activated");

    $scope.loginClicked = function () {

        userFactory.doLogIn();
    };


    $scope.statCheck = function () {

        console.log("statCheck activated");

        userFactory.factoryCheckStatus();
        
        // ezfb.getLoginStatus(function (res) {

        // console.log("res", res);    
        // // $scope.loginStatus = res;
        // });

    };

    $scope.firebaseCheck = function () {
        let firebaseUserinfo = userFactory.getFirebaseUser();
        console.log("firebaseUserinfo:", firebaseUserinfo);
        console.log("firebaseUserinfo.uid:", firebaseUserinfo.uid);
    };

    // ezfb.getLoginStatus();

    // ezfb.login(function (res) {

    //     console.log("res login", res);
    // });

    // ezfb.login();

   // to use:

// $scope.getMyLastName = function() {
//    facebookService.getMyLastName() 
//      .then(function(response) {
//        $scope.last_name = response.last_name;
//      }
//    );
// };

// console.log("tester:", $scope.getMyLastName());

    // const authCode = userFactory.getAuthCode();
    // const authToken = userFactory.getAccessToken();
    // var newAuthToken;

    // console.log("Auth Code:", authCode);
    // console.log("Auth Token:", authToken);

    // const result = userFactory.getAuthCode();
    // console.log("result", result);

    // console.log("getMyToken on load:", userFactory.getMyToken());


    // $scope.isLoggedIn = false;

    // const getUserInfo = function(token) {
    //     console.log("Token:", token);
    //     $http.get(`https://api.pinterest.com/v1/me/?access_token=${token}&fields=username%2Clast_name%2Cfirst_name%2Cimage`)
    //     .then((info) => {
    //         $scope.username = info.data.data.username;
    //         console.log("Personal Info:", info.data);
    //         console.log("Hello ", info.data.data.first_name + " " + info.data.data.last_name + "!");
    //         $('#targetDiv').append(`<img class="circle" src="${info.data.data.image["60x60"].url}" />`);
    //         $('#userName').append(`<span class="center">Hello ${info.data.data.first_name}<span>`);
    //     });
    // };

    // const loginProcess = function () {
    //     console.log("loginProcess started");
    //     // const authCode = userFactory.getAuthCode();
    //     userFactory.getAccessToken(userFactory.getAuthCode())
    //     .then((irrelevant) => {
    //         getUserInfo(userFactory.getMyToken());
    //         $scope.isLoggedIn = true;
    //     });
        
    // };

    // let isCodePresent = userFactory.checkURL();
    // let isTokenPresent = userFactory.getMyToken();
    // if (isCodePresent >= 0) {
    //         console.log("isCodePresent is >= 0");
    //         // loginProcess();
    //         if (isTokenPresent) {
    //             console.log("isTokenPresent", isTokenPresent);
    //         } else {
    //             loginProcess();
    //         }
    //     } else {
    //         console.log("isCodePresent is < 0");
    //     }

    // $scope.userLoginButton = function() {

    // };

    // $scope.logOutLink = () => {
    //     $scope.isLoggedIn = false;
    //     userFactory.logOut();
    //     isCodePresent = "";
    //     isTokenPresent = "";
    //     $window.location.href = `https://9d9b09a8.ngrok.io`;
    // };

    // $scope.loginUser = function() {
    //     return $q((resolve, reject) => {

            

    //         const myToken = userFactory.getMyToken();
    //         $window.location = `https://api.pinterest.com/oauth/?response_type=code&redirect_uri=https://9d9b09a8.ngrok.io&scope=read_public,write_public,read_relationships,write_relationships&client_id=4921312230101758289`;
    //         resolve(myToken);
    //         console.log("My pretty token:", myToken);
    //         })
    //         .then ((myToken) => {
    //         console.log("myToken after redirect:". myToken);
    //         $http.get(`https://api.pinterest.com/v1/me/?access_token=${myToken}&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage`);
    //         })
    //         .then((data) => {
    //             console.log("Personal Info:", data.data);
    //             console.log("Hello ", data.data.data.first_name + " " + data.data.data.last_name + "!");
    //             $('#targetDiv').append(`<img class="circle" src="${data.data.data.image["60x60"].url}" />`);
    //             $('#userName').append(`<span class="center">Hello ${data.data.data.first_name}<span>`);
    //         })
    //         .catch((error) => {
    //             console.log("Bad Request");
    //         });
    //     };
});
