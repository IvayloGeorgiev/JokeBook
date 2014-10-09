app.controller('UserDetailsCtrl', function($scope,$routeParams,auth, notifier,identity,JokesResource, UsersResource) {
    $scope.identity = identity;

    var currentUser= UsersResource.get({id:$routeParams.id.toString()}, function () {
       $scope.user = currentUser;
        console.log($scope.user._id);
    });


    $scope.update = function(user) {
        user.roles=[user.roles[0]];

        auth.updateOther(user,$routeParams.id).then(function(success) {
            notifier.success('User successfully updated!');
        }, function (error) {
            console.log(error);
            notifier.error('You failed to update the user info');
        });
    };
    $scope.jokes =JokesResource.query();
});

