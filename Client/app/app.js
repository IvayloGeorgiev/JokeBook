var app = angular.module('app', ['ngResource', 'ngRoute']).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/views/home',
            controller: 'MainCtrl'
        })
        .when('/joke/:id',{
            templateUrl:'/partials/views/joke-details',
            controller:'JokeDetailsCtrl'
        })
        .when('/jokes',{
            templateUrl:'/partials/views/jokes',
            controller:'JokesCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/views/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/views/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/views/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
});

app.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
});
