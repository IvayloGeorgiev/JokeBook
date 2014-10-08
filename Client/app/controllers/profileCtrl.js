app.controller('ProfileCtrl', function($scope, $location, auth, identity,notifier) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName,
        avatar:identity.currentUser.avatar
    };

    $scope.update = function(user) {
        auth.update(user).then(function() {
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            notifier.success('Info updated successfully!')
            $location.path('/');
        });
    };
    $scope.upload= function (user) {
        auth.uploadAvatar(user).then(function() {
            $scope.avatar=user.avatar;
            notifier.success('Avatar changed successfully!')
            $location.path('/');
        });

    };

    // to list current user jokes here
});
