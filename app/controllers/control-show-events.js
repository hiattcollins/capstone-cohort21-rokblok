"use strict";


console.log("control-show-events.js");

app.controller("eventShowCtrl", function($scope, $window, $location, $q, $http, eventFactory, userFactory, ezfb){



	$scope.sortEventsBy = 'start_time';

	$scope.sortBy = function(propertyName) {
		$scope.sortEventsBy = propertyName;
	};

	//******* Function to Retrieve Firebase User Id *******//

	let firebase_userId = "";

	const retrieveFirebaseId = function() {
		let firebase_userInfo = userFactory.getFirebaseUser();
		firebase_userId = firebase_userInfo.uid;
		console.log("control-retrieve-events retrieveFirebaseId $scope.firebase_userId:", firebase_userId);
	};


	// firebase.auth().getRedirectResult().then(function(result) {
	// 	console.log("getRedirectResult on eventShowCtrl result:", result);
	// });


	// firebase.auth().onIdTokenChanged(function(user) {

 //        console.log("firebase onIdTokenChanged triggered - user:", user);
 //      if (user) {
 //        // User is signed in or token was refreshed.
 //         console.log("firebase user:", user);

 //         let someThing = user;

 //         console.log("someThing", someThing);

 //      }
 //    });



	firebase.auth().onAuthStateChanged(function(user) {

	    console.log("firebase onAuthStateChanged triggered- user:", user);

	  if (user) {
	    console.log("User is signed in.");
	    firebase_userId = user.uid;

	    console.log("firebase_userId:", firebase_userId);

	    eventFactory.loadFacebookEvents();

	  }
	});


	//******* Test Function to Execute on Activation of Controller ******//
	const onAppOpen = function () {
		console.log("^^^^^^^^^testFunction just triggered");

		// retrieveFirebaseId();
		//****** On open - load facebook events *******//
		// eventFactory.loadFacebookEvents();

	};

	// onAppOpen();


	//******* Listener for Completion of Facebook Data *******//
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
					// retrieveFirebaseId();
					$scope.loadAndDisplayEvents();

				});
			}

	}, true);

	let indicator = function () {
		// $window.alert("data load is done!");
		console.log("data load is done");
	};
	//****** End of Facebook Data Listener *******//




	// ****** Retrieve Firebase User Id on Load ****** //
	// retrieveFirebaseId(); 


	// ****** ****** //


	// ****** Function to Get Likes/Events from Facebook ****** //

	$scope.getEventsFromFacebook = function () {
		// console.log("eventFactory.facebookDataDone:", eventFactory.facebookDataDone);
		// retrieveFirebaseId();
		eventFactory.loadFacebookEvents();
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

	$scope.saveEventToFirebase = function(eventId) {
		console.log("eventId in saveEventToFirebase", eventId);

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
			$scope.loadAndDisplayEvents();
		});
	};


	//******* Function to Delete Event from Firebase and Recalculate Event Array *******//
	$scope.deleteEventFromFirebase = function (eventId) {
		eventFactory.deleteSavedEvent(eventId)
		.then((irrelevant) => {
			$scope.loadAndDisplayEvents();
		});
	};

	$scope.loadAndDisplayEvents = function() {
		eventFactory.compileAllEvents(firebase_userId)
		.then((results) => {
			console.log("loadAndDisplayEvents results:", results);
			$scope.allEvents = results;
		});


		// eventFactory.getSavedEvents(firebase_userId)
		// .then((eventResults) => {
		// 	console.log("eventResults:", eventResults);
		// 	$scope.getAllEvents();
		// });
	};






});