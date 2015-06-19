(function() {
    angular.module('commodity-vectors.services').factory('Vessel', Vessel);

    function Vessel($resource) {
        return $resource('/notes/:id', null, {
            'update': {
                method: 'PUT'
            }
        });
    }
})();
