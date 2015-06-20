(function() {
    angular.module('commodity-vectors.controllers').controller('VesselViewCtrl', VesselViewCtrl);

    function VesselViewCtrl($scope, $mdDialog, vessel, displayVesselForm) {
        $scope.vessel = vessel;

        $scope.map = {
            center: {
                latitude: vessel.last_known_position[1],
                longitude: vessel.last_known_position[0]
            },
            zoom: 12
        };

        $scope.setPosition = function() {
            $scope.map.center = {
                latitude: vessel.last_known_position[1],
                longitude: vessel.last_known_position[0]
            };

        };

        $scope.openEdit = function(e) {
            displayVesselForm(e, $scope.vessel);
        };

        $scope.closeDialog = function() {
            $mdDialog.hide(false);
        };
    }
})();
