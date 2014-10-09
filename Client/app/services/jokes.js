app.factory('jokes', function($http, $q, identity, jokesResource) {
    return{
        create: function(joke) {
            var deferred = $q.defer();

            var joke = new jokesResource(joke);
            joke.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
});

