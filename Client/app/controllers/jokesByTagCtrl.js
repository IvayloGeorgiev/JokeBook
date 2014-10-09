app.controller('JokesByTagCtrl', function ($scope, $location, $routeParams, $route, JokesResource, comments, auth, identity, notifier) {
    console.log($routeParams.tag);

    var request = {
        tag:$routeParams.tag
    };
    $scope.tag=$routeParams.tag;
    $scope.jokes = JokesResource.query(request);
});
