(function() {
    angular.module('commodity-vectors.controllers').controller('VesselCtrl', VesselCtrl);

    function VesselCtrl($scope, $mdDialog, $rootScope, vessel, Vessel) {
        if(!vessel) {
            vessel = {
                last_known_position: []
            };

            vessel = new Vessel(vessel);
        }
        $scope.vessel = vessel;

        $scope.sending = false;

        $scope.addVessel = function() {
            $scope.sending = true;
            if($scope.vesselForm.$valid) {
                $scope.vessel.$save(function(v, response) {
                    $mdDialog.hide(v);
                }, function(response) {
                    if(response.data.errors) {
                        Object.keys(response.data.errors).forEach(function(field) {
                            $scope.vesselForm[field].$setDirty();
                            $scope.vesselForm[field].$setValidity('required', false);
                        });
                    }
                });

            }
            $scope.sending = false;
        };

        $scope.deleteVessel = function(ev) {
            $scope.vessel.deleted = new Date();
            Vessel.remove({id: $scope.vessel._id});
            $mdDialog.hide($scope.vessel);
        };

        $scope.closeAddForm = function() {
            $mdDialog.hide(false);
        };
    }
})();
