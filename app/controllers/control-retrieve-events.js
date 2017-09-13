"use strict";


console.log("control-retrieve-events.js");
/*
    this controller is instantiated when the 'user.html' template
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("eventRetrieveCtrl", function($scope, $window, $location, $q, $http, eventFactory, userFactory, ezfb){

	$scope.pullEventsFromFB = function() {

		let authItems = userFactory.getLoginReturn();
		console.log("authItems", authItems);
		console.log("authItems.authResponse:", authItems.authResponse);
		console.log("authItems.authResponse.userID:", authItems.authResponse.userID);
		console.log("authItems.authResponse.accessToken:", authItems.authResponse.accessToken);

		eventFactory.getLikes(authItems.authResponse.userID, authItems.authResponse.accessToken);

	};

});