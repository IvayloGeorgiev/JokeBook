app.controller('JokesCtrl', ["$scope", "identity", "JokesResource", function($scope, identity, JokesResource) {
    $scope.identity = identity;
    $scope.request = {
        page: 0
    };
    $scope.jokes = JokesResource.query($scope.request);
    $scope.previousPage = function() {
        if ($scope.request.page > 0) {
            $scope.request.page--;
            $scope.filter($scope.request);
        }
    }

    $scope.nextPage = function() {
        $scope.request.page++;
        $scope.filter($scope.request);
    }
    $scope.filter = function(request) {
        console.log(request);
        JokesResource.query(request)
            .$promise
            .then(function(jokes) {
                $scope.jokes = jokes;
            });
    };


}]);
