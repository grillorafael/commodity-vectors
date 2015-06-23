(function() {
    angular.module('commodity-vectors.controllers', []);
    angular.module('commodity-vectors.services', ['ngResource']);
    angular.module('commodity-vectors', [
            'ui.router',
            'ngMaterial',
            'ngMessages',
            'uiGmapgoogle-maps',
            'commodity-vectors.controllers',
            'commodity-vectors.services'
        ])
        .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('indigo');

            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyDcM2B0lVx6csyd7-1QMyDa5iwqZB2SJKQ',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });

            $urlRouterProvider.otherwise("/vessels");
            $stateProvider
                .state('vessels', {
                    url: "/vessels",
                    templateUrl: "/views/vessels.html",
                    controller: 'VesselsCtrl'
                })
                .state('vessels_alt', {
                    url: "/vessels/alt",
                    templateUrl: "/views/vessels.alt.html",
                    controller: 'VesselsCtrl'
                });

        });
})();
