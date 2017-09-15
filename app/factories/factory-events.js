"use strict";


app.factory("eventFactory", function ($q, $http, $window, ezfb) {

    let arrayOfIndividualEvents = [];
    let facebookDataDone = {isdone: false};

    const getLikes = function(userID, token) {

        console.log("userID:", userID, "token:", token);

        let cursor;
        let likesArray = [];
        let counter = 0;
        let cutoffDate = "2017-09-13";

        

        var nextPage1 = function() {

            ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`}, function(callResults) {
                console.log("here's *callResults* after nextPage1:", callResults);

                    if (callResults.data[0]) {
                        console.log("data of results has content");
                        cursor = callResults.paging.cursors.after;
                        console.log("print this in .then after nextPage1 call, cursor:", cursor);

                        angular.forEach(callResults.data, function(value, key) {
                            likesArray.push(value);
                        });

                        console.log("likesArray:", likesArray);

                        // parseEvents(likesArray);

                        // facebookDataDone.isdone = true;

                        nextPage1();

                    } else {
                        console.log("**data of results is undefined or not present");
                        parseEvents(likesArray);
                        facebookDataDone.isdone = true;
                        

                    }
            });
        // return facebookDataDone;
        };


    nextPage1();

   
    }; // ****** END OF GETLIKES ****** //

    const parseEvents = function (fullLikesArray) { 
        console.log("fullLikesArray:", fullLikesArray);

        let onlyMusicWithEventsArray = [];
        
        let eventObject = {
                    band_name: "",
                    event_name: "",
                    event_description: "",
                    venue_name: "",
                    start_time: "",
                    end_time: "",
                    event_id: "",
                    street: "",
                    city: "",
                    state: "",
                    country: "",
                    zip: "",
                    user_id: ""
                };

        // console.log("fullLikesArray[0", fullLikesArray.0);
        // console.log("fullLikesArray.1", fullLikesArray.1);
        // console.log("fullLikesArray.2", fullLikesArray.2);


        angular.forEach(fullLikesArray, function (value, key) {
            if (value.category == "Musician/Band" && value.events) {
                // console.log("contents for value.events:", value.events);
                onlyMusicWithEventsArray.push(value);
            }
        });

        console.log("onlyMusicWithEventsArray", onlyMusicWithEventsArray);

        angular.forEach(onlyMusicWithEventsArray, function (valueBand, keyBand) {

            angular.forEach(valueBand.events.data, function (valueEvents, keyEvents) {

                // ******* Reset eventObject to Empty ****** //
                eventObject = {band_name: "",event_name: "",event_description: "",venue_name: "",start_time: "",end_time: "",event_id: "",street: "",city: "",state: "",country: "",zip: ""};

                // ******* Set basic event info ****** //
                eventObject.band_name = valueBand.name;
                eventObject.event_name = valueEvents.name;
                eventObject.start_time = valueEvents.start_time;
                eventObject.end_time = valueEvents.end_time;
                eventObject.event_id = valueEvents.id;

                // ****** Add description if present ****** //
                if (valueEvents.description) {
                    eventObject.event_description = valueEvents.description;
                }

                // ****** Add location info if available ****** //
                if (valueEvents.place) {
                    eventObject.venue_name = valueEvents.place.name;

                    if (valueEvents.place.location) {
                        eventObject.street = valueEvents.place.location.street;
                        eventObject.city = valueEvents.place.location.city;                      
                        eventObject.state = valueEvents.place.location.state;
                        eventObject.country = valueEvents.place.location.country;
                        eventObject.zip = valueEvents.place.location.zip;                         
                    }

                }

                
                arrayOfIndividualEvents.push(eventObject);
                
            });

                // console.log("valueEvents", valueEvents);
                // console.log("valueEvents.description", valueEvents.description);
        });

        

        console.log("arrayOfIndividualEvents", arrayOfIndividualEvents);

    };

    const getIndividualEventsArray = function () {
        return arrayOfIndividualEvents;
    };

    return { getLikes, parseEvents, getIndividualEventsArray, facebookDataDone };

});
