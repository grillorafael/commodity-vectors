(function() {
    angular.module('commodity-vectors.controllers').controller('VesselCtrl', VesselCtrl);

    function VesselCtrl($scope, $mdDialog, $rootScope, vessel) {
        $scope.vessel = vessel;
        $scope.sending = false;

        $scope.addVessel = function() {
            // $scope.vesselForm.vesselName.$setDirty();
            // $scope.vesselForm.$setValidity('vesselName', false);
            $scope.sending = true;
            if($scope.vesselForm.$valid) {
                if (!$scope.vessel.id) {
                    $scope.vessel.id = parseInt(Math.random() * 10000);
                }

                $mdDialog.hide($scope.vessel);
            }
            $scope.sending = false;
        };

        $scope.deleteVessel = function(ev) {
            $scope.vessel.deleted = new Date();
            $mdDialog.hide($scope.vessel);
        };

        $scope.closeAddForm = function() {
            $mdDialog.hide(false);
        };
    }
})();
