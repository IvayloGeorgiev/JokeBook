app.factory('comments', function($q, $http) {
    return{
        post: function(comment, id){
            var url = "/jokes/" + id.toString() + "/comment"
            var deferred = $q.defer();

            $http.post(url, comment)
                .success(function(){
                    deferred.resolve();
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        delete: function(jokeId, commentId){
            var url = "/jokes/" + jokeId.toString() + "/comment/" + commentId.toString();
            var deferred = $q.defer();

            $http.delete(url)
                .success(function(joke){
                    deferred.resolve(joke);
                }, function(response){
                    deferred.reject(response);
                })
                .error(function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})