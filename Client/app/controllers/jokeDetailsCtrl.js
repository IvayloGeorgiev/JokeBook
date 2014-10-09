app.controller('JokeDetailsCtrl',["$scope", "$location", "$routeParams", "$route", "JokesResource", "comments", "auth", "identity", "notifier", function($scope, $location, $routeParams, $route, JokesResource, comments, auth, identity, notifier) {
    $scope.identity = identity;
    var joke = JokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;

        if (identity.currentUser){
            $scope.canEdit = ((auth.isAuthorizedForRole('admin') === true) || (identity.currentUser._id === $scope.joke.user._id));
        }

        if (identity.currentUser){
            $scope.canVote = $scope.joke.likeIds.indexOf($scope.joke.user._id)
            //TODO add id check from server list.
        }
    }, function(){
        $scope.invalidUrl = true;
    });

    $scope.upvote = function upvote(){

        $scope.joke.likes++;
        //TODO - server and validation
    }

    $scope.downvote = function downvote(){
        $scope.joke.likes--;
        //TODO - server and validation
    }

    $scope.enablePostComment = function enablePostComment(){
        $scope.enablePost = true;
    }

    $scope.cancelComment = function cancelComment(){
        $scope.enablePost = false;
    }

    $scope.postComment = function postComment(comment){
        if (comment && comment.text) {
            comments.post(comment, $routeParams.id).then(
                function () {
                    notifier.success("Comment post successful!");
                    $scope.cancelComment();
                    $route.reload();
                },
                function () {
                    notifier.error("Post comment failed.");
                }
            )
        } else {
            notifier.error("Comment field must not be empty!");
        }
    }
}]);
