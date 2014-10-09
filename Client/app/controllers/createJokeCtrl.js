app.controller('CreateJokeCtrl',['$scope', '$location', 'identity', 'jokes', 'notifier', 'tagsService', function($scope, $location, identity, jokes, notifier, tagsService) {
    tagsService.get().then(function (tags){
        $scope.tags = tags;
    }, function (error){
        notifier.error('Could not retrieve tag data!');
    });

    $scope.create = function(joke) {
        jokes.create(joke).then(function() {
            notifier.success('You successfully created a joke!');
            $location.path('/');
        })
    }
}]);

