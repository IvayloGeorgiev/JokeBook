app.factory('jokesResource', function($resource) {
    var jokesResource = $resource('jokes/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    return jokesResource;
})
