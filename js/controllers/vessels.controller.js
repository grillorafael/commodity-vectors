(function() {
    angular.module('commodity-vectors.controllers').controller('VesselsCtrl', VesselsCtrl);

    function VesselsCtrl($scope, $mdDialog, Vessel) {
        $scope.vessels = [{
            id: 1,
            name: "I'm a vessel",
            width: 102,
            length: 100,
            draft: 100,
            last_known_position: [10, 20]
        }, {
            id: 2,
            name: "I'm a vessel",
            width: 102,
            length: 100,
            draft: 100,
            last_known_position: [10, 20]
        }, {
            id: 3,
            name: "I'm a vessel",
            width: 102,
            length: 100,
            draft: 100,
            last_known_position: [10, 20]
        }, {
            id: 4,
            name: "I'm a vessel",
            width: 102,
            length: 100,
            draft: 100,
            last_known_position: [10, 20]
        }];

        $scope.$on('new vessel added', function(e, vessel) {
            $scope.vessels.push(vessel);
        });

        $scope.$on('vessel updated', function(e, updatedVessel) {
            $scope.vessels.forEach(function(vessel, idx) {
                if (vessel.id === updatedVessel.id) {
                    $scope.vessels[idx] = updatedVessel;
                }
            });
        });

        function displayVesselForm(ev, vessel) {
            vessel = angular.extend({}, vessel);
            $mdDialog.show({
                locals: {
                    vessel: vessel
                },
                controller: 'VesselCtrl',
                clickOutsideToClose: true,
                templateUrl: '/views/vessels.new.html',
                targetEvent: ev,
            });
        }

        $scope.addVessel = displayVesselForm;
        $scope.editVessel = displayVesselForm;
    }
})();
