(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise("/");

            // $httpProvider.interceptors.push('myHttpInterceptor');
            //
            // Now set up the states

            $stateProvider
            .state('search', {
                url: "/",
                templateUrl: "search/search.html",
                controller: 'searchController'
            })
            .state('update', {
                url: "/update/{login}",
                templateUrl: "update/update.html",
                controller: 'updateController',
                resolve: {

                    updateService: 'updateService',
                    login: function (updateService, $stateParams) {
                        return updateService.getInfo($stateParams.login);
                    }
                }
            })
            .state('add', {
                url: "/add",
                templateUrl: "add/add.html",
                controller: 'addController'
            })
            .state('complete', {
                url: "/complete",
                templateUrl: "complete/complete.html",
                controller: 'completeController'
            })
        });
})();
