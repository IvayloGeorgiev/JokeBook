app.controller('UserDetailsCtrl', function($scope,$routeParams,auth, notifier, UsersResource) {


    $scope.update = function(user) {
        auth.updateOther(user,$routeParams.id).then(function(success) {
            notifier.success('User successfully updated!');
        }, function (error) {
            console.log(error);
            notifier.error('You failed to update the user info');
        });
    };

});

