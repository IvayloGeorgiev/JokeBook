'use strict';

app.factory('tagsService', function($q, $http) {
    return{
        get: function(){
            var url = "/tags/";
            var deferred = $q.defer();

            $http.get(url)
                .success(function(tags){
                    deferred.resolve(tags);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})