"use strict";


app.factory("userFactory", function ($q, $http, $window) {

    var authCode;
    var token;

    const checkURL = function() {
        let currentURL = $window.location.href;
        let isCodePresent = currentURL.indexOf("code");
        return isCodePresent;
    };

    const getAuthCode = function() {
        let currentURL = $window.location.href;
        authCode = currentURL.slice(32, 48);
        console.log('Temporary Auth Code:', authCode);
        // return authCode;
    };

    const getAccessToken = function() {
    //     return $http.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`)
    //     .then((authCode) => {
    //         console.log('Permanent Access Token:', authCode.data.access_token);
    //         token = authCode.data.access_token;
    //         // $window.location = `https://api.pinterest.com/v1/me/boards/?access_token${data.data.access_token}=&fields=id%2Cname%2Curl`;
    //         // resolve(token);
    //         return token;
    //     })
    //     .catch((error) => {
    //         console.log("Request Error:", error);
    //     })
    //     .then((token) => {
    //         console.log("THE TOKEN:", token);
    //         token = token;
    //     });
    };

    const getMyToken = function() {
        return token;
    };

    const logOut = function () {
        console.log("logout clicked");
        authCode = "";
        token = "";
    };

    // const getUserInfo = function() {
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

    return { checkURL, authCode, getAuthCode, getAccessToken, getMyToken, logOut };
});

