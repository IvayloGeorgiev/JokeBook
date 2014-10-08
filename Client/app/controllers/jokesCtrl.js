app.controller('JokesCtrl', function($scope, JokesResource) {
    $scope.jokes = JokesResource.query();
});
