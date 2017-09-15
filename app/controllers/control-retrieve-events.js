"use strict";


console.log("control-retrieve-events.js");
/*
    this controller is instantiated when the 'user.html' template
    is rendered at the '/login' path.
    it uses the userFactory to handle the registration of new users, login with google or email and password.

 */

app.controller("eventRetrieveCtrl", function($scope, $window, $location, $q, $http, eventFactory, userFactory, ezfb){


	// $scope.pullEventsFromFB = function() {

	// 	let authItems = userFactory.getLoginReturn();
	// 	console.log("authItems", authItems);
	// 	console.log("authItems.authResponse:", authItems.authResponse);
	// 	console.log("authItems.authResponse.userID:", authItems.authResponse.userID);
	// 	console.log("authItems.authResponse.accessToken:", authItems.authResponse.accessToken);

	// 	eventFactory.getLikes(authItems.authResponse.userID, authItems.authResponse.accessToken);
	// 	// eventFactory.getLikes()
	// 	// .then((results) => {
	// 	// 	console.log("pullEventsFromFB results", results);
	// 	// });
	// };
	$scope.checkId = function(eventId) {
		console.log("eventId", eventId);
	};


	$scope.pullEventsFromFB = function () {
		console.log("eventFactory.facebookDataDone:", eventFactory.facebookDataDone);
		eventFactory.getLikes();
	};


	let counter = 1;

	$scope.$watch(function(){return eventFactory.facebookDataDone;}, function(newValue, oldValue, scope){
		console.log("newValue:", newValue, "oldValue", oldValue, "scope", scope);
		console.log("eventFactory.facebookDataDone", eventFactory.facebookDataDone);
		console.log("counter:", counter);
		counter++;
	}, true);

	// $scope.$watch(function(){return eventFactory.facebookDataDone;}, function(newValue, oldValue, scope){
	// 	console.log("newValue:", newValue, "oldValue", oldValue, "scope", scope);
	// });

	// $scope.pullEventsFromFB = function () {
	// 	return $q.when(eventFactory.getLikes())
	// 	.then((someResults) => {
	// 		console.log("someResults in pullEventsFromFB:", someResults);
	// 	});
	// };


// let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
//   console.log("userFactory is", userFactory);
//   userFactory.isAuthenticated()
//   .then( (userExists) => {
//     if(userExists){
//       console.log("Authenticated, go ahead");
//       resolve();
//     }else {
//       console.log("Authentication reject, GO AWAY");
//       reject();
//     }
//   });
// });


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