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

        function updateOrAppendVessel(newVessel) {
            var found = false;
            $scope.vessels.forEach(function(vessel, idx) {
                if (vessel.id === newVessel.id) {
                    $scope.vessels[idx] = newVessel;
                    found = true;
                }
            });

            if(!found) {
                $scope.vessels.push(newVessel);
            }
        }

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
            }).then(function(vessel) {
                if(vessel) {
                    updateOrAppendVessel(vessel);
                }
            });
        }

        $scope.addVessel = displayVesselForm;
        $scope.editVessel = displayVesselForm;
    }
})();
