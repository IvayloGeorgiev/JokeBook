app.controller('EditJokeCtrl', ["$scope", "$location", "$routeParams", "identity", "tagsService", "auth", "JokesResource", "notifier", function($scope, $location, $routeParams, identity, tagsService, auth, JokesResource, notifier) {
    $scope.routeId = $routeParams.id.toString();

    tagsService.get().then(function (tags){
        $scope.tags = tags;
    }, function (error){
        notifier.error('Could not retrieve tag data!');
    });

    var joke = JokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;

        if ((auth.isAuthorizedForRole('admin') !== true) && (identity.currentUser._id !== $scope.joke.user._id)){
            $location.path("joke/" + $scope.routeId);
        }
    }, function(){
        $scope.invalidUrl = true;
    });

    $scope.edit = function editPost(joke){
        JokesResource.update({id:$routeParams.id.toString()}, joke, function(res){
            $location.path("joke/" + $scope.routeId);
        }, function(res){
            notifier.error('Edit post failed!')
        });
    }
}]);

