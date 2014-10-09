app.controller('JokeDetailsCtrl', ["$scope", "$location", "$routeParams", "$route", "JokesResource", "comments", "auth", "identity", "notifier","likeService", function($scope, $location, $routeParams, $route, JokesResource, comments, auth, identity, notifier, likeService) {
    $scope.identity = identity;
    var joke = JokesResource.get({id:$routeParams.id.toString()}, function() {
        $scope.joke = joke;

        if (identity.currentUser){
            $scope.canEdit = ((auth.isAuthorizedForRole('admin') === true) || (identity.currentUser._id === $scope.joke.user._id));
        }

        updateCanVote();
    }, function(){
        $scope.invalidUrl = true;
    });

    function updateCanVote(){
        if (identity.currentUser){
            $scope.canVote = ($scope.joke.likeIds.indexOf(identity.currentUser._id) === -1);
        }
    }

    function makeVote(vote){
        $scope.joke.likes += vote;
        $scope.joke.likeIds.push(identity.currentUser._id);
        var vote = {vote: vote};
        updateCanVote();
        likeService.put($routeParams.id, vote);
    }

    $scope.isAdmin = auth.isAuthorizedForRole('admin') === true;
    console.log($scope.isAdmin);

    $scope.deleteJoke = function(){
        JokesResource.remove({id:$routeParams.id.toString()}, function(){
            $location.path("/jokes");
        }, function(error){
            console.log(error);
        })
    };

    $scope.upvote = function upvote(){
        makeVote(1);
    };

    $scope.downvote = function downvote(){
        makeVote(-1);
    };

    $scope.deleteComment = function(commentId){
        console.log(commentId);
        comments.delete($routeParams.id, commentId)
            .then(function(joke){
                notifier.success("Comment deleted.");
                $scope.joke = joke;
            }, function(error){
                console.log(error);
            });
    };


    $scope.enablePostComment = function enablePostComment(){
        $scope.enablePost = true;
    };

    $scope.cancelComment = function cancelComment(){
        $scope.enablePost = false;
    };

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
    };
}]);
