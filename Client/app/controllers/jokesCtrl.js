app.controller('JokesCtrl', function($scope, jokesResource) {
    $scope.jokes = jokesResource.query();
});
