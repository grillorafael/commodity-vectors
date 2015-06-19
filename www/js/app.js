(function() {
    angular.module('commodity-vectors.controllers', []);
    angular.module('commodity-vectors.services', ['ngResource']);
    angular.module('commodity-vectors', [
        'ui.router',
        'ngMaterial',
        'commodity-vectors.controllers',
        'commodity-vectors.services'
    ])
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
