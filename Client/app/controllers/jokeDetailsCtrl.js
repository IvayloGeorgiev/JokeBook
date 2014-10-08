app.controller('JokeDetailsCtrl', function($scope, $location, $routeParams, JokesResource, auth, identity) {
//    JokesResource.get({_id:$routeParams.id}, function(joke){
//        console.log(joke);
//    }, function (error){
//        console.log(error);
//    });

    $scope.joke = {
        user: {
            username: "Pencho",
            _id: "kkkjka"
        },
        title: "Kriite se v gorata",
        body: "На месаря му се ражда първо дете.Седи и той там,гледа, нали само веднъж му се ражда на човек първо дете. Излиза детето и акушерките го дават на месаря да го претегли.Слага го той на кантара и казва: -3 и 600!Така ли да го оставя?",
        likes: 0,
        comments: [
            {
                user:{
                    username: "Doncho"
                },
                text: "Mnogo tup vic",
                date: "2014-06-06T15:33"
            },
            {
                user:{
                    username: "Petko"
                },
                text: "Mnogo gotin vic",
                date: "2014-06-06T15:33"
            }
        ],
        tags: ["Шеги", "Вицове"],
        date: "2014-05-05T13:15"
    }

    if (identity.currentUser){
        $scope.canEdit = ((auth.isAuthorizedForRole('admin') == true) || (identity.currentUser._id === $scope.joke.user._id));
    }
    //to list joke details
    //Title , Content, Author, Date, Likes Comments...
});
