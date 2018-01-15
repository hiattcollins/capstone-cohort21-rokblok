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
                    resolve(true);
                }else {
                    $window.location.href = "#!/login";
                    resolve(false);
                }
            });
        });
    };


    let loginReturn = {};

    const doLogIn = function () {

        ezfb.login(function (res) {

        console.log("res login", res);

        loginReturn = res;

        firebase.auth().signInWithRedirect(provider);

        $window.location.href = "#!/";

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
    };

    const getMyToken = function() {
        return token;
    };

    const logOut = function () {
        console.log("logout clicked");
        authCode = "";
        token = "";
    };

    var provider = new firebase.auth.FacebookAuthProvider();

    console.log("provider:", provider);

    let firebase_user = null;

    const getFirebaseUser = function () {
        console.log("getFirebaseUser triggered - no remaining functions");
    };


    return { isAuthenticated, checkURL, authCode, getAuthCode, getAccessToken, getMyToken, logOut, factoryCheckStatus, getLoginReturn, doLogIn, doLogout, getFirebaseUser };
});

