app.controller('CreateJokeCtrl', function($scope, $location, jokes,notifier) {
    $scope.create = function(joke) {
        jokes.create(joke).then(function() {
            notifier.success('You successfully created a joke!');
            $location.path('/');
        })
    }
});

