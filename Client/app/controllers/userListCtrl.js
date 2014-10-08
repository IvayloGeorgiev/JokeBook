app.controller('UserListCtrl', function($scope, UsersResource) {
    $scope.users = UsersResource.query();
    console.log($scope.users)
});
