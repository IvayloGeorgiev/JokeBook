'use strict';

app.factory('likeService', function($q, $http) {
    return{
        put: function(id, vote){
            var url = "/jokes/" + id.toString() + "/like";
            var deferred = $q.defer();

            $http.put(url, vote)
                .success(function(){
                    deferred.resolve();
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})
