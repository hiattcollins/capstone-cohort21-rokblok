"use strict";


app.factory("eventFactory", function ($q, $http, $window, ezfb) {

    let arrayOfIndividualEvents = [];

    const getLikes = function(userID, token) {

        console.log("userID:", userID, "token:", token);

        let cursor;
        let likesArray = [];
        let counter = 0;
        let cutoffDate = "2017-09-13";

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

    // return $q((resolve, reject) => {

// var runThis = function () {

//     return $q ((resolve, reject) => {
//         var nextPage1 = function() {

//             ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`}, function(callResults) {
//                 console.log("here's *callResults* after nextPage1:", callResults);

//                     if (callResults.data[0]) {
//                         console.log("data of results has content");
//                         cursor = callResults.paging.cursors.after;
//                         console.log("print this in .then after nextPage1 call, cursor:", cursor);

//                         angular.forEach(callResults.data, function(value, key) {
//                             likesArray.push(value);
//                         });

//                         console.log("likesArray:", likesArray);

//                         nextPage1();

//                     } else {
//                         console.log("**data of results is undefined or not present");
//                         // parseEvents(likesArray);
//                         // resolve();
//                     }

//             });
//             // return likesArray;
//         };
//     });    


// };

// runThis()
// .then((something) => {
//     console.log("likesArray", likesArray);
// });

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

                        nextPage1();

                    } else {
                        console.log("**data of results is undefined or not present");
                        parseEvents(likesArray);
                    }
                // resolve(likesArray);

            });
            // return likesArray;
        };

    // $q.when(nextPage1())
    // .then((something) => {
    //     console.log("something", something);
    //     console.log("likesArray", likesArray);
    // });

    nextPage1();

    // var testfunction = function () {
    //     return $q((resolve, reject) => {
    //         nextPage1()
    //         .then((returnFromNextPage1) => {
    //             console.log("returnFromNextPage1 in function", returnFromNextPage1);
    //             resolve(returnFromNextPage1);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });
    // };



    // testfunction()
    // .then((resultsFromTestfunction) => {
    //     console.log("resultsFromTestfunction", resultsFromTestfunction);
    // });


        //         .then(function(callResults) {
        //             // console.log("print this in .then after nextPage1 call, cursor:", cursor);
        //             console.log("here's *callResults* after nextPage1:", callResults);

        //             if (callResults.data[0]) {
        //                 console.log("data of results has content");
        //                 cursor = callResults.paging.cursors.after;
        //                 console.log("print this in .then after nextPage1 call, cursor:", cursor);

        //                 angular.forEach(callResults.data, function(value, key) {
        //                     likesArray.push(value);
        //                 });

        //                 console.log("likesArray:", likesArray);

        //                 nextPage1();

        //             } else {
        //                 console.log("**data of results is undefined or not present");
        //                 // parseEvents(likesArray);
                        
        //             }
                    
                    
        //         });
               

        //     });
        // };

        // nextPage1()
        // .then((results) => {
        //     console.log("results after the nextPage1() .then", results);
        //     console.log("likesArray after the nextPage1() .then", likesArray);
        //     // parseEvents(results);
        // });



// *****************  SINGLE FUNCTION WORKING ... SOMEWHAT
        // var nextPage1 = function() {
        //     return $q((resolve, reject) => {
        //         ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`})
        //         .then(function(callResults) {
        //             // console.log("print this in .then after nextPage1 call, cursor:", cursor);
        //             console.log("here's *callResults* after nextPage1:", callResults);

        //             if (callResults.data[0]) {
        //                 console.log("data of results has content");
        //                 cursor = callResults.paging.cursors.after;
        //                 console.log("print this in .then after nextPage1 call, cursor:", cursor);

        //                 angular.forEach(callResults.data, function(value, key) {
        //                     likesArray.push(value);
        //                 });

        //                 console.log("likesArray:", likesArray);

        //                 nextPage1();

        //             } else {
        //                 console.log("**data of results is undefined or not present");
        //                 parseEvents(likesArray);
                        
        //             }
                    
                    
        //         });
        //         resolve(likesArray);

        //     });
        // };

        // nextPage1()
        // .then((results) => {
        //     console.log("results after the nextPage1() .then", results);
        //     console.log("likesArray after the nextPage1() .then", likesArray);
        //     // parseEvents(results);
        // });



        // var initialCall = function() {

        //     ezfb.api('/me/likes', {fields: `name,about,category,events.since(${cutoffDate})`})
        //     .then((callResults) => {

        //         // console.log("print this after initialCall call, cursor:", cursor);
        //         console.log("here's *callResults* after initialCall:", callResults);

        //         if (callResults.data[0]) {

        //             console.log("data of results has content");
        //             cursor = callResults.paging.cursors.after;
        //             console.log("print this after initialCall call, cursor:", cursor);

        //             angular.forEach(callResults.data, function(value, key) {
        //                 likesArray.push(value);
        //             });

        //             console.log("likesArrayy:", likesArray);

        //             nextPage1();  // ***********  disconnected for testing
        //             // parseEvents(likesArray);

        //         } else {
        //             console.log("data of results is undefined or not present");
        //             parseEvents(likesArray); // ***********  disconnected for testing
        //         }

        //     });
        // };

        // var nextPage1 = function() {

        //     ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`})
        //     .then(function(callResults) {
        //         // console.log("print this in .then after nextPage1 call, cursor:", cursor);
        //         console.log("here's *callResults* after nextPage1:", callResults);

        //         if (callResults.data[0]) {
        //             console.log("data of results has content");
        //             cursor = callResults.paging.cursors.after;
        //             console.log("print this in .then after nextPage1 call, cursor:", cursor);

        //             angular.forEach(callResults.data, function(value, key) {
        //                 likesArray.push(value);
        //             });

        //             console.log("likesArray:", likesArray);

        //             nextPage2();

        //         } else {
        //             console.log("data of results is undefined or not present");
        //             parseEvents(likesArray);
        //         }

                
        //     });

        // };

        // var nextPage2 = function() {
        //     ezfb.api('/me/likes', {after: cursor, fields: `name,about,category,events.since(${cutoffDate})`})
        //     .then(function(callResults) {
        //         // console.log("print this in .then after nextPage2 call, cursor", cursor);
        //         console.log("here's *callResults* after nextPage2:", callResults);

        //         if (callResults.data[0]) {
        //             console.log("data of results has content");
        //             cursor = callResults.paging.cursors.after;
        //             console.log("print this in .then after nextPage2 call, cursor", cursor);

        //             angular.forEach(callResults.data, function(value, key) {
        //                 likesArray.push(value);
        //             });

        //             console.log("likesArray:", likesArray);

        //             nextPage1();

        //         } else {
        //             console.log("data of results is undefined or not present");
        //             parseEvents(likesArray);
        //         }

        //     });
        // };

        // initialCall();
        // .then((returnFromInitialCall) => {
        //     console.log("returnFromInitialCall", returnFromInitialCall);
        // });

      


 // var initialCall = function() {

 //            let resultsArray = [];

 //            return $q((resolve, reject) => {
 //                ezfb.api('/me/likes', {fields: `name,about,category,events.since(${cutoffDate})`})
 //                .then((callResults) => {

 //                    // console.log("print this after initialCall call, cursor:", cursor);
 //                    console.log("here's *callResults* after initialCall:", callResults);

 //                    if (callResults.data[0]) {

 //                        console.log("data of results has content");
 //                        cursor = callResults.paging.cursors.after;
 //                        console.log("print this after initialCall call, cursor:", cursor);

 //                        angular.forEach(callResults.data, function(value, key) {
 //                            resultsArray.push(value);
 //                        });

 //                        console.log("resultsArray:", resultsArray);

 //                        // nextPage1();  // ***********  disconnected for testing
 //                        // parseEvents(likesArray);

 //                    } else {
 //                        console.log("data of results is undefined or not present");
 //                        // parseEvents(likesArray); // ***********  disconnected for testing
 //                    }

 //                resolve(resultsArray);
 //                })
 //                .catch((error) => {
 //                    reject(error);
 //                });
 //            });
 //        };





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

    return { getLikes, parseEvents, getIndividualEventsArray };

});
