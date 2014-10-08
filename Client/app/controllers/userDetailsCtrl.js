app.controller('UserDetailsCtrl', function($scope,$routeParams,auth, notifier, UsersResource) {

   //not working... don't know why
    var currentUser= UsersResource.get({id:$routeParams.id.toString()}, function () {
       $scope.currentUser = currentUser;
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

});

