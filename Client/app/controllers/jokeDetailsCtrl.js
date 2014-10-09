app.controller('JokeDetailsCtrl', function($scope, $location, $routeParams, jokesResource, auth, identity) {
    $scope.identity = identity;
    var joke = jokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;
        if (identity.currentUser){
            $scope.canEdit = ((auth.isAuthorizedForRole('admin') == true) || (identity.currentUser._id === $scope.joke.user));
        }
    });
});
