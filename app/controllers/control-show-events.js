"use strict";


console.log("control-show-events.js");

app.controller("eventShowCtrl", function($scope, $window, $location, $q, $http, eventFactory, userFactory, ezfb){

	// $scope.allEvents = [];

	$scope.getAllEvents = function() {
		console.log("getAllEvents triggered, $scope.allEvents:", $scope.allEvents);
		let events = eventFactory.getIndividualEventsArray();
		// userFactory.getIndividualEventsArray();
		console.log("events", events);
		$scope.allEvents = events;
		console.log("$scope.allEvents after call:", $scope.allEvents);
	};

	$scope.getAllEvents();
});