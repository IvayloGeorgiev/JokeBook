app.factory('JokesResource', function($resource) {
    var JokesResource = $resource('jokes/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return JokesResource;
})
