app.controller('EditJokeCtrl', function($scope, $location, $routeParams, identity, auth, JokesResource, notifier) {
    $scope.routeId = $routeParams.id.toString();

    var joke = JokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;

        if ((auth.isAuthorizedForRole('admin') !== true) && (identity.currentUser._id !== $scope.joke.user._id)){
            $location.path("joke/" + $scope.routeId);
        }
    }, function(){
        $scope.invalidUrl = true;
    });

    $scope.edit = function editPost(joke){
        JokesResource.update({id:$routeParams.id.toString()}, $scope.joke, function(res){
            $location.path("joke/" + $scope.routeId);
        }, function(res){
            notifier('Edit post failed!')
        });
    }
});

