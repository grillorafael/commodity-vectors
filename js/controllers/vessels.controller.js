(function() {
    angular.module('commodity-vectors.controllers').controller('VesselsCtrl', VesselsCtrl);

    function VesselsCtrl($scope, Vessel) {
        $scope.vessels = [
            {
                id: 1,
                name: "I'm a vessel",
                width: 102,
                length: 100,
                draft: 100,
                last_known_position: [10, 20]
            },
            {
                id: 2,
                name: "I'm a vessel",
                width: 102,
                length: 100,
                draft: 100,
                last_known_position: [10, 20]
            },
            {
                id: 3,
                name: "I'm a vessel",
                width: 102,
                length: 100,
                draft: 100,
                last_known_position: [10, 20]
            },
            {
                id: 4,
                name: "I'm a vessel",
                width: 102,
                length: 100,
                draft: 100,
                last_known_position: [10, 20]
            }
        ];
    }
})();
