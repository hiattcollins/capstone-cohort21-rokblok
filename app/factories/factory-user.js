"use strict";


app.factory("userFactory", function ($q, $http, $window, ezfb) {


    const isAuthenticated = function (){
      console.log("userFactory: isAuthenticated");
      return $q( (resolve, reject) => {
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


    const checkFacebookLogin = function () {
      return $q( (resolve, reject) => {
        ezfb.getLoginStatus(function (res) {
          console.log("checkFacebookLogin -> res.authResponse:", res.authResponse);
          resolve(res.authResponse);
        });
      });
    };

    const checkFirebaseLogin = function () {
      return $q( (resolve, reject) => {
        let firebaseResponse = firebase.auth().currentUser;
        console.log("checkFirebaseLogin -> firebaseResponse:", firebaseResponse);
        resolve(firebaseResponse);
      });
    };

      const facebookLogin = function () {
        let facebookAuthResponse = null;
        return $q( (resolve, reject) => {
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
        return $q( (resolve, reject) => {
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
      return $q( (resolve, reject) => {
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
          console.log("Logged out of facebook");
          });
        } else {
          console.log("Already logged out of facebook");
        }
      });

      firebase.auth().signOut().then(function() {
        console.log("Signed Out from Firebase");
      }, function(error) {
          console.error("Sign Out Error", error);
      });

      $window.location.href = "#!/login";
    };


    return { isAuthenticated, doLogIn, doLogout };

});

