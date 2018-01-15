"use strict";

const app = angular.module("rokblok", ["ngRoute", "ezfb"]);

let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
  console.log("userFactory is", userFactory);
  userFactory.isAuthenticated()
  .then( (userExists) => {
    if(userExists){
      console.log("Authenticated, go ahead");
      resolve();
    }else {
      console.log("Authentication reject, GO AWAY");
      reject();
    }
  });
});


app.config(($routeProvider, $httpProvider)=> {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/show-events.html',
        controller: 'eventShowCtrl',
        resolve: {isAuth}
    })
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'userCtrl'

    })
    .otherwise('/');
});


app.config((ezfbProvider, FacebookCreds) => {
	let fbCreds = FacebookCreds;
	let fbAppId = fbCreds.app_id;
	ezfbProvider.setInitParams({
    appId: fbAppId,

    // Module default is `v2.6`.
    // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
    // https://developers.facebook.com/docs/javascript/reference/FB.init
    version: 'v2.10'
  });
});


app.run(($location, FirebaseCreds)=> firebase.initializeApp(FirebaseCreds));

