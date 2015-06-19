(function() {
    angular.module('commodity-vectors.controllers').controller('VesselCtrl', VesselCtrl);

    function VesselCtrl($scope, $mdDialog, $rootScope, vessel) {
        $scope.vessel = vessel;

        $scope.addVessel = function() {
            var eventName = 'vessel updated';
            if(!$scope.vessel.id) {
                eventName = 'new vessel added';
                $scope.vessel.id = parseInt(Math.random() * 10000);
            }

            $mdDialog.hide($scope.vessel);
        };

        $scope.closeAddForm = function() {
            $mdDialog.hide(false);
        };
    }
})();
