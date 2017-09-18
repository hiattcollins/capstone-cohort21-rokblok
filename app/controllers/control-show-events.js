"use strict";


console.log("control-show-events.js");

app.controller("eventShowCtrl", function($scope, $window, $location, $q, $http, eventFactory, userFactory, ezfb){

	//******* Function to Retrieve Firebase User Id *******//

	let firebase_userId = "";

	const retrieveFirebaseId = function() {
		let firebase_userInfo = userFactory.getFirebaseUser();
		firebase_userId = firebase_userInfo.uid;
		console.log("control-retrieve-events retrieveFirebaseId $scope.firebase_userId:", firebase_userId);
	};

	// ****** Retrieve Firebase User Id on Load ****** //
	// retrieveFirebaseId(); 


	// ****** ****** //


	// ****** Function to Get Likes/Events from Facebook ****** //

	$scope.getEventsFromFacebook = function () {
		// console.log("eventFactory.facebookDataDone:", eventFactory.facebookDataDone);
		retrieveFirebaseId();
		eventFactory.loadFacebookEvents();
	};



		let counter = 1;

	$scope.$watch(function(){return eventFactory.facebookDataDone;}, function(newValue, oldValue, scope){
		console.log("newValue:", newValue, "oldValue", oldValue, "scope", scope);
		console.log("eventFactory.facebookDataDone", eventFactory.facebookDataDone);
		console.log("counter:", counter);
		counter++;
		
			if (eventFactory.facebookDataDone.isdone) {
				$q.when(eventFactory.getFacebookEventsArray())
				.then((results) => {
					console.log("results:", results);
				});
			}

	}, true);

	let indicator = function () {
		// $window.alert("data load is done!");
		console.log("data load is done");
	};






	$scope.getAllEvents = function() {
		// console.log("getAllEvents triggered, $scope.allEvents:", $scope.allEvents);
		let events = eventFactory.getIndividualEventsArray();
		// userFactory.getIndividualEventsArray();
		console.log("events", events);
		$scope.allEvents = events;
		console.log("$scope.allEvents after call:", $scope.allEvents);
	};

	// $scope.getAllEvents();

		$scope.checkId = function(eventId) {
		console.log("eventId", eventId);

		function isCorrectObject(element) {
			if (element.event_id == eventId) {
			return (element);
			}
		}


		let eventsToSearch = eventFactory.getIndividualEventsArray();
		let foundEvent = eventsToSearch.find(isCorrectObject);

		foundEvent.user_id = firebase_userId;

		console.log("foundEvent:", foundEvent);

		eventFactory.saveEvent(foundEvent)
		.then((irrelevant) => {
			$scope.getEventsFromFirebase();
		});

	};

	$scope.deleteEventFromFirebase = function (eventId) {
		eventFactory.deleteSavedEvent(eventId)
		.then((irrelevant) => {
			$scope.getEventsFromFirebase();
		});
	};

	$scope.getEventsFromFirebase = function() {

		eventFactory.compileAllEvents()
		.then((results) => {
			console.log("getEventsFromFirebase results:", results);
			$scope.allEvents = results;

			// $scope.getAllEvents();
		});


		// eventFactory.getSavedEvents(firebase_userId)
		// .then((eventResults) => {
		// 	console.log("eventResults:", eventResults);
		// 	$scope.getAllEvents();
		// });
	};






});