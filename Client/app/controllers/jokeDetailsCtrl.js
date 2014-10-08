app.controller('JokeDetailsCtrl', function($scope, $location, auth, identity) {
    $scope.joke = {
        user: {
            username: "Pencho",
            _id: "kkkjka"
        },
        title: "Kriite se v gorata",
        body: "На месаря му се ражда първо дете.Седи и той там,гледа, нали само веднъж му се ражда на човек първо дете. Излиза детето и акушерките го дават на месаря да го претегли.Слага го той на кантара и казва: -3 и 600!Така ли да го оставя?",
        likes: 5,
        comments: [
            {
                user:{
                    username: "Doncho"
                },
                text: "Mnogo tup vic",
                date: "2014/6/6T15:33"
            },
            {
                user:{
                    username: "Petko"
                },
                text: "Mnogo gotin vic",
                date: "2014/6/6T15:33"
            }
        ],
        tags: ["Шеги", "Вицове"],
        date: "2014/5/5T13:15"
    }
    //to list joke details
    //Title , Content, Author, Date, Likes Comments...
});
