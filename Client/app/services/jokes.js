app.factory('jokes', function($http, $q,  JokesResource) {
    return{
        create: function(joke) {
            var deferred = $q.defer();

            var joke = new JokesResource(joke);
            joke.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
});

