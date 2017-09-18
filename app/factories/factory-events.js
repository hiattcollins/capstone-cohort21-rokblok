"use strict";


app.factory("eventFactory", function ($q, $http, $window, FirebaseCreds, ezfb) {

    let arrayOfFacebookEvents = [];
    let arrayOfIndividualEvents = [];
    let facebookDataDone = {isdone: false};


    const compileAllEvents = function () {
        return $q((resolve, reject) => {
            getSavedEvents()
            .then((firebaseEvents) => {

                console.log("firebaseEvents:", firebaseEvents); 

                arrayOfIndividualEvents = firebaseEvents;

                console.log("arrayOfIndividualEvents before add:", arrayOfIndividualEvents);

                
                let firebaseIndices = $.map(firebaseEvents, (element, index) => {
                            return element.event_id;
                });

                console.log("firebaseIndices", firebaseIndices); 

                $.each(arrayOfFacebookEvents, (index, item) => {
                        if (firebaseIndices.includes(item.event_id)) {
                            console.log("song saved to firebase");
                        } else {
                            arrayOfIndividualEvents.push(item);
                        }
                });
            })
            .then((irrelevant) => {
                console.log("arrayOfIndividualEvents after facebook add:", arrayOfIndividualEvents);
                resolve(arrayOfIndividualEvents);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };



// et combinedArray = firebaseMovieArray;

//                     let firebaseIndices = $.map(firebaseMovieArray, (element, index) => {
//                         return element.id;
//                     }); 

//                     console.log("firebaseIndices", firebaseIndices);

//                     // let result = $.grep(arrayOfMoviesFromSearch, function (elementAPI, indexAPI) => {
//                     //     return($.each(firebaseMovieArray, (indexFB, itemFB) => {

//                     //     }););
//                     // });

//                     $.each(arrayOfMoviesFromSearch, (indexAPI, itemAPI) => {
//                         if (firebaseIndices.includes(itemAPI.id)) {
//                             console.log("searched movie appears on FB");
//                         } else {
//                             combinedArray.push(itemAPI);
//                         }
//                     });




    const saveEvent = function(eventObject) {
        let objectToSave = angular.toJson(eventObject);
        console.log("objectToSave", objectToSave);
        console.log("URL for posting:", `${FirebaseCreds.databaseURL}/events.json`);
        return $http.post(`${FirebaseCreds.databaseURL}/events.json`, objectToSave)
        .then((data) => {
            console.log("data", data);
            return data;
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };


    const getSavedEvents = function(firebase_userId){
        let events = [];
        console.log("url is", `${FirebaseCreds.databaseURL}/events.json?orderBy="user_id"`); //   &equalTo="${firebase_userId}" 
        return $q((resolve, reject) => {
            $http.get(`${FirebaseCreds.databaseURL}/events.json?orderBy="user_id"`)
            .then((eventObject) => {
                console.log("eventObject:", eventObject);
                let eventCollection = eventObject.data;
                console.log("eventCollection", eventCollection);
                Object.keys(eventCollection).forEach((key) => {
                    eventCollection[key].data_id = key;
                    events.push(eventCollection[key]);
                });

                // arrayOfIndividualEvents = events;

                // console.log("arrayOfIndividualEvents in getSavedEvents:", arrayOfIndividualEvents);

                resolve(events);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    const deleteSavedEvent = function(event_id){
        console.log("deleteSavedEvent event_id:", event_id);
        return $q((resolve, reject) => {
            $http.delete(`${FirebaseCreds.databaseURL}/events/${event_id}.json`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };


    //     const deleteTask = function(id){
    //     console.log("deleteTask id->", id);
    //     return $q((resolve, reject) => {
    //         $http.delete(`${FBCreds.databaseURL}/items/${id}.json`)
    //         .then((response) => {
    //             resolve(response);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });
    // };

    // const getAllTasks = function(user){
    //     let tasks = [];
    //     console.log("url is", `${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`);
    //     return $q((resolve, reject) => {
    //         $http.get(`${FBCreds.databaseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
    //         .then((itemObject) => {
    //             let itemCollection = itemObject.data;
    //             console.log("itemCollection", itemCollection);
    //             Object.keys(itemCollection).forEach((key) => {
    //                 itemCollection[key].id = key;
    //                 tasks.push(itemCollection[key]);
    //             });
    //             resolve(tasks);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });
    // };


    // const addTask = function(obj){
    //     let newObj = JSON.stringify(obj);
    //     return $http.post(`${FBCreds.databaseURL}/items.json`, newObj)
    //     .then((data) => {
    //         console.log("data", data);
    //         return data;
    //     }, (error) => {
    //         let errorCode = error.code;
    //         let errorMessage = error.message;
    //         console.log("error", errorCode, errorMessage);
    //     });
    // };


    // ****** Function to Load Liked Pages from Facebook and Compile Array of Individual Event Objects ****** /
    const loadFacebookEvents = function () {
        console.log("loadFacebookEvents triggered");

        // ****** Function to Load Likes from Facebook ****** /
        const getLikes = function() {
            console.log("getLikes triggered");

            let cursor;
            let likesArray = [];
            let counter = 0;
            let cutoffDate = "2017-09-13";

            var likesLoader = function() {
                console.log("likesLoader triggered");

                ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`}, function(callResults) {
                    console.log("here's *callResults* in likesLoader", callResults);

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

                            likesLoader();

                        } else {
                            console.log("**data of results is undefined or not present");
                            parseEvents(likesArray);
                            // facebookDataDone.isdone = true;
                        }
                });
            };

            //****** Trigger likesLoader on Call of getLikes Function ******//
            likesLoader();
        };

        //******* Trigger getLikes on Call of loadFacebookEvents Function ******//
        getLikes();

        // ****** Function to Parse Events from Facebook Likes and Create Event Objects ****** /

        const parseEvents = function (fullLikesArray) { 
            console.log("parseEvents triggered");
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
                        user_id: "",
                        data_id: ""
                    };

            angular.forEach(fullLikesArray, function (value, key) {
                if (value.category == "Musician/Band" && value.events) {
                    onlyMusicWithEventsArray.push(value);
                }
            });

            console.log("onlyMusicWithEventsArray", onlyMusicWithEventsArray);

            // ****** Function to Get Each Individual Event and Add Event and Band Info ******//
            var constructEventObjects = function() {
                angular.forEach(onlyMusicWithEventsArray, function (valueBand, keyBand) {

                    angular.forEach(valueBand.events.data, function (valueEvents, keyEvents) {

                        // ******* Reset eventObject to Empty ****** //
                        eventObject = {band_name: "",event_name: "",event_description: "",venue_name: "",start_time: "",end_time: "",event_id: "",street: "",city: "",state: "",country: "",zip: "", user_id: undefined, data_id: undefined};

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

                        arrayOfFacebookEvents.push(eventObject);
                        // .then((result) => {
                        //     console.log("this is the .then at end of arrayOfFacebookEvents");
                        //     console.log("arrayOfFacebookEvents", arrayOfFacebookEvents);
                        //     facebookDataDone.isdone = true;
                        // });
                    });
                });
                // console.log("arrayOfFacebookEvents", arrayOfFacebookEvents);

            };

            $q.when(constructEventObjects())
            .then((result) => {
                console.log("result:", result);
                console.log("arrayOfFacebookEvents", arrayOfFacebookEvents);
                facebookDataDone.isdone = true;
            });

        };
        // return arrayOfFacebookEvents;
    };

    const getFacebookEventsArray = function () {
        return arrayOfFacebookEvents;
    };

    const getIndividualEventsArray = function () {
        return arrayOfIndividualEvents;
    };

    return { compileAllEvents, saveEvent, getSavedEvents, deleteSavedEvent, loadFacebookEvents, getIndividualEventsArray, getFacebookEventsArray, facebookDataDone };

});
