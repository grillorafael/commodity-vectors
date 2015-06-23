(function() {
    angular.module('commodity-vectors.controllers').controller('VesselsCtrl', VesselsCtrl);

    function VesselsCtrl($scope, $mdDialog, $timeout, Vessel) {
        $scope.viewModes = [{
            value: "/views/fragments/_vessels.card.html",
            label: "View as Cards"
        }, {
            value: "/views/fragments/_vessels.list.html",
            label: "View as List"
        }];

        var initialViewMode = localStorage.getItem('vessels_view_mode') || $scope.viewModes[0].value;
        $scope.status = {
            isLoading: true,
            viewMode: initialViewMode
        };

        $scope.mapOptions = {
            panControl: false,
            rotateControl: false,
            scaleControl: false,
            streetViewControl: false
        };
        $scope.initialZoom = 14;

        $scope.vessels = Vessel.query(function(vessels) {
            $scope.status.isLoading = false;
        });

        function updateVesselsList(newVessel) {
            var found = false;
            $scope.vessels.forEach(function(vessel, idx) {
                if (vessel._id === newVessel._id) {
                    found = true;
                    if (newVessel.deleted) {
                        $scope.vessels.splice(idx, 1);
                    } else {
                        $scope.vessels[idx] = newVessel;
                    }
                }
            });

            if (!found) {
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
                if (vessel) {
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
                if (vessel) {
                    updateVesselsList(vessel);
                }
            });
        };

        $scope.onChangeViewMode = function() {
            localStorage.setItem('vessels_view_mode', $scope.status.viewMode);
        };

        $scope.addVessel = displayVesselForm;
        $scope.editVessel = displayVesselForm;
    }
})();
