app.controller('JokesCtrl', function($scope, JokesResource) {
    $scope.jokes = JokesResource.query();
    console.log($scope.jokes);
});
