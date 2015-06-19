(function() {
    angular.module('commodity-vectors.controllers', []);
    angular.module('commodity-vectors.services', []);
    angular.module('commodity-vectors', ['ui.router', 'ngMaterial', 'commodity-vectors.controllers'])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/dashboard");
            $stateProvider
                .state('methods', {
                    url: "/dashboard",
                    templateUrl: "/views/dashboard.html"
                })
                .state('vessels', {
                    url: "/vessels",
                    templateUrl: "/views/vessels.html",
                    controller: 'VesselsCtrl'
                });

        });
})();
