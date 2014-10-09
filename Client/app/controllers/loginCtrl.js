app.controller('LoginCtrl', function($scope, $location, $route, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $route.reload();
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    };
});

