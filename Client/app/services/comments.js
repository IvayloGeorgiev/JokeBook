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
        }
    }
})