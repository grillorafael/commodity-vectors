(function() {
    angular.module('commodity-vectors.services').factory('Vessel', Vessel);

    function Vessel($resource) {
        var ENDPOINT = "http://commodity-api.rgrillo.com/api";
        return $resource(ENDPOINT + '/vessels/:id');
    }
})();
