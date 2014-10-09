app.controller('MainCtrl', function($scope, $location,JokesResource ,auth, identity) {
    $scope.request = {
        page: 0
    };
    $scope.jokes = JokesResource.query($scope.request);
});
