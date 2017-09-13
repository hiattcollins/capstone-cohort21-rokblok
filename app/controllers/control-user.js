"use strict";


console.log("control-user.js");
/*
    this controller is instantiated when the 'user.html' template
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("userCtrl", function($scope, $window, $location, $q, $http, userFactory, ezfb){

    // console.log("userCtrl activated");


    // ezfb.getLoginStatus(function (res) {

    // console.log("res", res);    
    // // $scope.loginStatus = res;
    // });

    // ezfb.getLoginStatus();


    


    // const authCode = userFactory.getAuthCode();
    // const authToken = userFactory.getAccessToken();
    // var newAuthToken;

    // console.log("Auth Code:", authCode);
    // console.log("Auth Token:", authToken);

    // $scope.getUserInfo = function() {
    //     const myToken = userFactory.getMyToken();
    //     console.log("My pretty token:", myToken);
        
    //     $http.get(`https://api.pinterest.com/v1/me/?access_token=${myToken}&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage`)
    //     .then((data) => {
    //         console.log("Personal Info:", data.data);
    //         console.log("Hello ", data.data.data.first_name + " " + data.data.data.last_name + "!");
    //         $('#targetDiv').append(`<img class="circle" src="${data.data.data.image["60x60"].url}" />`);
    //         $('#userName').append(`<span class="center">Hello ${data.data.data.first_name}<span>`);
    //     })
    //     .catch((error) => {
    //         console.log("Bad Request");
    //     });
    // };

    
});









    // var newAuthToken;

    // const authCode = userFactory.getAuthCode();
    // const authToken = userFactory.getAccessToken();



    // authToken.then(function(response){ 
    //     console.log("Response:", response);
    //     newAuthToken = response;
    //     // return newAuthToken;
    // });
    // }).then
    // ((newAuthToken) => {
    //     console.log("New Auth Token", newAuthToken);
    //     console.log("Auth Code:", authCode); 
    //     let obj = {
    //                    name: 'NSS Codez',
    //                };
    //     $http.post(`https://api.pinterest.com/v1/boards/?access_token=AVMV5l-nZiyAwSDQcdXjwAm4wDVCFOHnKIE4yKFETJNSM2Av4QAAAAA&fields=id%2Cname%2Curl`, obj)
    //     .then((data) => {
    //         console.log("Post Data:", data);
    //     })
    //     .catch((error) => {
    //         console.log("Bad Request");
    //     });
    // });



    

    // console.log("Auth Token", authToken);
    // console.log("New Auth Token", newAuthToken);
    




//     let authCode;
//     let token;

//     $('#authCode').click(() => {
//         let currentURL = $window.location.href;
//         authCode = currentURL.slice(32, 48);
//         console.log('Temporary Auth Code:', authCode);
//     });

//     $('#token').click(() => {
//         return $q((resolve, reject) => {
//             $http.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`)
//             .then((authCode) => {
//                 console.log('Permanent Access Token:', authCode.data.access_token);
//                 token = authCode.data.access_token;
//                 // $window.location = `https://api.pinterest.com/v1/me/boards/?access_token${data.data.access_token}=&fields=id%2Cname%2Curl`;
//                 resolve(token);
//             })
//             .then((accessToken) => {
//                 console.log("Token:", token);
//                 $http.get(`https://api.pinterest.com/v1/me/?access_token=${token}&fields=first_name%2Cid%2Clast_name%2Curl%2Cimage`)
//                 .then((info) => {
//                     console.log("Personal Info:", info.data);
//                     console.log("Hello ", info.data.data.first_name + " " + info.data.data.last_name + "!");
//                     $('#targetDiv').append(`<img class="circle" src="${info.data.data.image["60x60"].url}" />`);
//                     $('#userName').append(`<span class="center">Hello ${info.data.data.first_name}<span>`);
//                 });
//             })
//             .then((irrelevant) => {
//                 console.log('inside my post');
//                 let obj = {
//                                name: 'NSS Codez',
//                            };
//                 console.log('token', token);
//                 $http.post(`https://api.pinterest.com/v1/boards/?access_token=AVMV5l-nZiyAwSDQcdXjwAm4wDVCFOHnKIE4yKFETJNSM2Av4QAAAAA&fields=id%2Cname%2Curl`, obj)
//                 .then((data) => {
//                     console.log("Post Data:", data);
//                 })
//                 .catch((error) => {
//                     console.log("Bad Request");
//                     reject(error);
//                 });
//             });
// //         });
//         // $window.location = `https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=${PINCreds.client_id}&client_secret=${PINCreds.client_secret}&code=${authCode}`;
//     });
// });

   