(function() {
    angular.module('commodity-vectors.controllers').controller('VesselFormCtrl', VesselFormCtrl);

    function VesselFormCtrl($scope, $mdDialog, $timeout, vessel, Vessel, displayVesselForm) {
        if (!vessel) {
            vessel = {
                last_known_position: []
            };

            vessel = new Vessel(vessel);
        }
        $scope.vessel = vessel;

        $scope.sending = false;

        $scope.onPastePosition = function() {
            $timeout(function() {
                var content = $scope.vessel.last_known_position[1];
                if(content && content.split(',').length == 2) {
                    content = content.split(',');
                    var latitude = content[0];
                    var longitude = content[1];
                    try {
                        $scope.vessel.last_known_position = [
                            longitude,
                            latitude
                        ];
                    }
                    catch(e) {
                        // Not numeric
                    }
                }
            });
        };

        $scope.openEdit = function(e) {
            displayVesselForm(e, $scope.vessel);
        };

        $scope.addVessel = function() {
            $scope.sending = true;
            $scope.vessel.$save(function(v, response) {
                $mdDialog.hide(v);
                $scope.sending = false;
            }, function(response) {
                $scope.sending = false;
                if (response.data.errors) {
                    Object.keys(response.data.errors).forEach(function(field) {
                        $scope.vesselForm[field].$setDirty();
                        $scope.vesselForm[field].$setValidity('required', false);
                    });
                }
            });
        };

        $scope.deleteVessel = function(ev) {
            $scope.vessel.deleted = new Date();
            Vessel.remove({
                id: $scope.vessel._id
            });
            $mdDialog.hide($scope.vessel);
        };

        $scope.closeDialog = function() {
            $mdDialog.hide(false);
        };
    }
})();
