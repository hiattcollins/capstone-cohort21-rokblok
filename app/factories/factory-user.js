"use strict";


app.factory("userFactory", function ($q, $http, $window, ezfb) {



    // let currentUser = null;
    // let facebookToken = null;


    const isAuthenticated = function (){
      console.log("userFactory: isAuthenticated");
      return new Promise ( (resolve, reject) => {
        let facebookResponse = null;
        let firebaseResponse = null;
        checkFacebookLogin()
        .then(function (facebookReturn) {
          console.log("facebookReturn:", facebookReturn);
          facebookResponse = facebookReturn;
        })
        .then(checkFirebaseLogin)
        .then(function (firebaseReturn) {
          console.log("firebaseReturn:", firebaseReturn);
          firebaseResponse = firebaseReturn;

          if (facebookResponse && firebaseResponse){
            resolve(true);
          }else {
            $window.location.href = "#!/login";
            resolve(false);
          }
        });
      });
    };

    let loginReturn = {};

    const checkFacebookLogin = function () {
      return new Promise ( (resolve, reject) => {
        ezfb.getLoginStatus(function (res) {
          console.log("checkFacebookLogin -> res.authResponse:", res.authResponse);
          resolve(res.authResponse);
        });
      });
    };

    const checkFirebaseLogin = function () {
      return new Promise ( (resolve, reject) => {
        let firebaseResponse = firebase.auth().currentUser;
        console.log("checkFirebaseLogin -> firebaseResponse:", firebaseResponse);
        resolve(firebaseResponse);
      });
    };

      const facebookLogin = function () {
        let facebookAuthResponse = null;
        return new Promise ( (resolve, reject) => {
          ezfb.login(function (res) {
            console.log("facebook res:", res);
            facebookAuthResponse = res.authResponse;
          }, {scope: 'user_likes'})
          .then(function (something) {
            if (facebookAuthResponse) {
              console.log("facebookAuthResponse:", facebookAuthResponse);
              resolve(facebookAuthResponse);
            } else {
              var error = new Error("Error with facebook login.");
              reject(error);
            }
          });
        });
      };

     const firebaseLogin = function (facebookAuthResponse) {
        return new Promise ( (resolve, reject) => {
          console.log("facebookAuthResponse in firebaseLogin:", facebookAuthResponse);
          let signinToken = firebase.auth.FacebookAuthProvider.credential(facebookAuthResponse.accessToken);
          firebase.auth().signInWithCredential(signinToken)
          .then(function (firebaseSigninResult) {
            console.log("firebaseSigninResult:", firebaseSigninResult);
            if (firebaseSigninResult) {
              resolve(firebaseSigninResult);
            } else {
              var error = new Error("Error with firebase login.");
              reject(error);
            }
          });
        });
      };

    const doLogIn = function () {
      return new Promise ( (resolve, reject) => {
        facebookLogin()
        .then(firebaseLogin)
        .then(function (something) {
          console.log("something:", something);
          $window.location.href = "#!/";
          resolve(something);
        })
        .catch(function (error) {
          console.log(error.message);
        });
      });
    };


    const doLogout = function () {
      checkFacebookLogin()
      .then(function (res) {
        console.log("in doLogout - res from checkFacebookLogin:", res);
        if (res) {
          ezfb.logout(function (logoutRes) {
          // console.log("doLogout logoutRes:", logoutRes);
          });
        } else {
          console.log("Already logged out of facebook");
        }
      });


      firebase.auth().signOut().then(function() {
        console.log("Signed Out from Firebase");
          // firebase_user = null;
          // console.log("firebase_user after logout:", firebase_user);
      }, function(error) {
          console.error("Sign Out Error", error);
      });

      $window.location.href = "#!/login";
    };


    // const factoryCheckStatus = function() {

    //     ezfb.getLoginStatus(function (res) {

    //     console.log("res in factoryCheckStatus", res);
    //     loginReturn = res;

    //     console.log("loginReturn in factory:", loginReturn);

    //     });

    // };

    // const getLoginReturn = function() {
    //     console.log("loginReturn in getLoginReturn:", loginReturn);
    //     return loginReturn;
    // };


    // var authCode;
    // var token;

    // const checkURL = function() {
    //     let currentURL = $window.location.href;
    //     let isCodePresent = currentURL.indexOf("code");
    //     return isCodePresent;
    // };

    // const getAuthCode = function() {
    //     let currentURL = $window.location.href;
    //     authCode = currentURL.slice(32, 48);
    //     console.log('Temporary Auth Code:', authCode);
    //     // return authCode;
    // };

    // const getAccessToken = function() {
    // };

    // const getMyToken = function() {
    //     return token;
    // // };

    // const logOut = function () {
    //     console.log("logout clicked");
    //     authCode = "";
    //     token = "";
    // };

    // var provider = new firebase.auth.FacebookAuthProvider();

    // console.log("provider:", provider);

    let firebase_user = null;

    // const getFirebaseUser = function () {
    //     console.log("getFirebaseUser triggered - no remaining functions");
    // };


    return { isAuthenticated, doLogIn, doLogout };

    // return { isAuthenticated, checkURL, authCode, getAuthCode, getAccessToken, getMyToken, logOut, factoryCheckStatus, getLoginReturn, doLogIn, doLogout, getFirebaseUser };
});

