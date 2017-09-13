"use strict";



// instatiate the module as 'app'

const app = angular.module("rokblok", ["ngRoute", "ezfb"]);
// is user logged in?
// this is checked as the 'resolve' in most views
// the resolve is an optional map of dependencies if they are resolved successfully,
// they will be injected when the controller is instantiated, and are available to $scope in that controller under $resolve.
// else a $routeChangeError will be fired
// in this case, we need to know if the user is logged in to determine whether to allow access to certain paths

// const isAuth = (userFactory) => userFactory.isAuthenticated();

// using $routeProvider to configure the routes
// the .when specifies the the template, controller, and the resolve (see above)
// to be instantiated when the path is requested


app.config(($routeProvider, $httpProvider)=> {
    $routeProvider
    .when('/', {
	    templateUrl: 'partials/show-events.html',
	    // controller: 'userCtrl'
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

// .run blocks - A run block is the code which needs to run to kickstart the application. 
// It is executed after all of the service have been configured and the injector has been created
// here we are just initializing our app with firebase, passing 'FRCreds', a constant registered in app/fb-creds.js
// which contains the databaseURL, apiKey, and authDomain need to interact with the app
// app.run(($rootScope, $window) => {

// .config(function (ezfbProvider) {

// 	ezfbProvider.setInitParams({
//     // This is my FB app id for plunker demo app 
//     appId: '386469651480295',
 
//     // Module default is `v2.6`. 
//     // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter. 
//     // https://developers.facebook.com/docs/javascript/reference/FB.init 
//     version: 'v2.3'
//   });  
// });





app.run(($location, FirebaseCreds)=> firebase.initializeApp(FirebaseCreds));



// app.run(($location, FirebaseCreds) => {
// 	let creds = FBCreds;
// 	let authConfig = {
// 		apiKey: creds.apiKey,
// 		authDomain: creds.authDomain,
// 		databaseURL: creds.databaseURL
// 	};

// 	firebase.initializeApp(authConfig);
// });


// app.run(function($rootScope) {
// 	$rootScope.showSearch = false;
// });
