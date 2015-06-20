(function() {
    angular.module('commodity-vectors.controllers').controller('VesselsCtrl', VesselsCtrl);

    function VesselsCtrl($scope, $mdDialog, Vessel) {
        $scope.vessels = Vessel.query();

        function updateVesselsList(newVessel) {
            var found = false;
            $scope.vessels.forEach(function(vessel, idx) {
                if (vessel._id === newVessel._id) {
                    found = true;
                    if(newVessel.deleted) {
                        $scope.vessels.splice(idx, 1);
                    }
                    else {
                        $scope.vessels[idx] = newVessel;
                    }
                }
            });

            if(!found) {
                $scope.vessels.push(newVessel);
            }
        }

        function displayVesselForm(ev, vessel) {
            vessel = angular.copy(vessel);
            $mdDialog.show({
                locals: {
                    vessel: vessel
                },
                controller: 'VesselCtrl',
                clickOutsideToClose: true,
                templateUrl: '/views/vessels.form.html',
                targetEvent: ev,
            }).then(function(vessel) {
                if(vessel) {
                    updateVesselsList(vessel);
                }
            });
        }

        $scope.addVessel = displayVesselForm;
        $scope.editVessel = displayVesselForm;
    }
})();
