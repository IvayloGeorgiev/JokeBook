app.factory('JokesResource', function($resource) {
    var JokesResource = $resource('jokes/:id', {_id:'@id'}, { get: {method: 'GET', isArray: true}, update: {method: 'PUT', isArray: false}});

    return JokesResource;
})
