"use strict";


app.factory("userFactory", function ($q, $http, $window, ezfb) {



    let currentUser = null;

    const isAuthenticated = function (){
        console.log("userFactory: isAuthenticated");
        return new Promise ( (resolve, reject) => {
            ezfb.getLoginStatus(function (res) {
                console.log("isAuthenticated res:", res);
                console.log("isAuthenticated res.authResponse:", res.authResponse);

            if (res.authResponse){
                    // currentUser = user.uid;
                    // console.log("user", user.uid);
                    // firebaseCheck();
                    resolve(true);
                }else {
                    $window.location.href = "#!/login";
                    resolve(false);
                }
            });
        });
    };


  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     $scope.isLoggedIn = true;
  //     console.log("currentUser logged in?", user);
  //     console.log("logged in t-f", $scope.isLoggedIn );
  //     $scope.$apply();
  //   } else {
  //     $scope.isLoggedIn = false;
  //     console.log("user logged in?", $scope.isLoggedIn);
  //     $window.location.href = "#!/login";
  //   }
  // });

    let loginReturn = {};


    const doLogIn = function () {

        ezfb.login(function (res) {

        console.log("res login", res);

        loginReturn = res;

        firebase.auth().signInWithRedirect(provider);

        $window.location.href = "#!/";

        // firebase.auth().signInWithRedirect(provider);

        }, {scope: 'user_likes'});


    };

    const doLogout = function () {
        ezfb.logout(function (res) {
            console.log("logout checked - res:", res);
        });

        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
          firebase_user = null;
          console.log("firebase_user after logout:", firebase_user);
        }, function(error) {
          console.error('Sign Out Error', error);
        });

        $window.location.href = "#!/login";
    };


    const factoryCheckStatus = function() {

        ezfb.getLoginStatus(function (res) {

        console.log("res in factoryCheckStatus", res);    
        loginReturn = res;

        console.log("loginReturn in factory:", loginReturn);

        });

    };

    const getLoginReturn = function() {
        console.log("loginReturn in getLoginReturn:", loginReturn);
        return loginReturn;
    };


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

    var provider = new firebase.auth.FacebookAuthProvider();

    console.log("provider:", provider);

    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //     console.log("popup result:", result);
    // });

    // firebase.auth().signInWithRedirect();

    // firebase.auth().getRedirectResult(  ).then(function(result) {
    //     console.log("getRedirectResult result:", result);
    // });


    let firebase_user = null;

    // firebase.auth().onIdTokenChanged(function(user) {

    //     console.log("firebase onIdTokenChanged triggered - user:", user);
    //   if (user) {
    //     // User is signed in or token was refreshed.
    //      console.log("firebase user:", user);

    //      firebase_user = user;

    //   }
    // });

    // firebase.auth().signInWithRedirect(provider);

    // firebase.auth();

    // let firebaseCheck = function () {
    //     console.log("firebaseCheck triggered");

    //     // firebase.auth().onIdTokenChanged(function(user) {

    //     //     console.log("firebase onIdTokenChanged triggered - user:", user);
    //     //   if (user) {
    //     //     // User is signed in or token was refreshed.
    //     //      console.log("firebase user:", user);

    //     //      firebase_user = user;

    //     //   }
    //     // });

    //     firebase.auth().getRedirectResult().then(function(result) {
    //     console.log("firebase auth result:", result);
    //     });


    // };

    // firebase.auth().getRedirectResult().then(function(result) {
    //     console.log("firebase auth result:", result);
    // });




    // firebase.auth().onAuthStateChanged(function(user) {

    // console.log("firebase onAuthStateChanged triggered - user:", user);

    // });


    const getFirebaseUser = function () {
        // return firebase_user;
        console.log("getFirebaseUser triggered - no remaining functions");
    };



// firebase.auth().onAuthStateChanged(function(user) {

//     console.log("firebase onAuthStateChanged triggered- user:", user);

//   if (user) {
//     console.log("User is signed in.");
//   }
// });

// firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// firebase.auth().getRedirectResult().then(function(result) {
// if (result.credential) {
//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
// var token = result.credential.accessToken;
//     // ...
// }
//   // The signed-in user info.
// var user = result.user;
// }).catch(function(error) {
//   // Handle Errors here.
// var errorCode = error.code;
// var errorMessage = error.message;
//   // The email of the user's account used.
// var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
// var credential = error.credential;
//   // ...
// });




    return { isAuthenticated, checkURL, authCode, getAuthCode, getAccessToken, getMyToken, logOut, factoryCheckStatus, getLoginReturn, doLogIn, doLogout, getFirebaseUser };
});

