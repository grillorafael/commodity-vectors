(function() {
    angular.module('commodity-vectors.services').factory('Vessel', Vessel);

    function Vessel($resource) {
        var ENDPOINT = "http://localhost:3000/api";
        return $resource(ENDPOINT + '/vessels/:id');
    }
})();
