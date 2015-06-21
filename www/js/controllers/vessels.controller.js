(function() {
    angular.module('commodity-vectors.controllers').controller('VesselsCtrl', VesselsCtrl);

    function VesselsCtrl($scope, $mdDialog, Vessel) {
        $scope.vessels = Vessel.query(function(vessels) {});

        $scope.mapOptions = {
            panControl: false,
            rotateControl: false,
            scaleControl: false,
            streetViewControl: false
        };
        $scope.initialZoom = 14;

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
                    vessel: vessel,
                    displayVesselForm: displayVesselForm
                },
                controller: 'VesselFormCtrl',
                clickOutsideToClose: true,
                templateUrl: '/views/vessels.form.html',
                targetEvent: ev,
            }).then(function(vessel) {
                if(vessel) {
                    updateVesselsList(vessel);
                }
            });
        }

        $scope.viewVessel = function(ev, vessel) {
            $mdDialog.show({
                locals: {
                    vessel: vessel,
                    displayVesselForm: displayVesselForm
                },
                controller: 'VesselViewCtrl',
                clickOutsideToClose: true,
                templateUrl: '/views/vessels.view.html',
                targetEvent: ev,
            }).then(function(vessel) {
                if(vessel) {
                    updateVesselsList(vessel);
                }
            });
        };

        $scope.getPosition = function(vessel) {
            return {
                latitude: vessel.last_known_position[1],
                longitude: vessel.last_known_position[0]
            };
        };

        $scope.addVessel = displayVesselForm;
        $scope.editVessel = displayVesselForm;
    }
})();
