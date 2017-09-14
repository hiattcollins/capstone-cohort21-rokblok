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
		// eventFactory.getLikes()
		// .then((results) => {
		// 	console.log("pullEventsFromFB results", results);
		// });
	};


	// band_name}}</p>
	// 	<p>{{item.event_name}}</p>
	// 	<p>{{item.event_description}}</p>
	// 	<p>{{item.venue_name}

	// $scope.allEvents = [{band_name: "this band",
	// 					event_name: "some event",
	// 					event_description: "so fun",
	// 					venue_name: "that place"
	// 					}];

	// $scope.getAllEvents = function() {
	// 	console.log("getAllEvents triggered, $scope.allEvents:", $scope.allEvents);
	// 	let events = eventFactory.getIndividualEventsArray();
	// 	// userFactory.getIndividualEventsArray();
	// 	console.log("events", events);
	// 	$scope.allEvents = events;
	// 	console.log("$scope.allEvents after call:", $scope.allEvents);
	// };


});