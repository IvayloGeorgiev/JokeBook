app.controller('EditJokeCtrl', function($scope, $location, $routeParams, identity, JokesResource, notifier) {
    $scope.routeId = $routeparams.id.toString();
    var joke = JokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;
        if ((auth.isAuthorizedForRole('admin') == false) || (identity.currentUser._id === $scope.joke.user._id)){
            $location = "joke/" + $scope.routeId;
        }
    });

    $scope.edit = function editPost(){
        JokesResource.Update({id:$routeParams.id.toString()}, $scope.joke);
    }
});

