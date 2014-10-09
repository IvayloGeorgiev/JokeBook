'use strict';

app.directive('tagSelector', function() {
    return {
        restrict: 'A',
        templateUrl: 'partials/views/directives/tag-selector',
        replace: true
    }
});
