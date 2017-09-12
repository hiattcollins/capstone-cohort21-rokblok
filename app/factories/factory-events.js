"use strict";


// ****** Data service specified by facebook ****** //
app.factory("facebookService", function($q, $http, $window) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});


// to use:

// $scope.getMyLastName = function() {
//    facebookService.getMyLastName() 
//      .then(function(response) {
//        $scope.last_name = response.last_name;
//      }
//    );
// };