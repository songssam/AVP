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
            .state('home', {
                url: "/",
                templateUrl: "home/home.html",
                controller: 'homeController'
            })
            .state('search', {
                url: "/search",
                templateUrl: "search/search.html",
                controller: 'searchController',

            })
            .state('userState', {
                url: "/userState/{login}",
                templateUrl: "userState/userState.html",
                controller: 'userStateController',
                resolve: {

                    userService: 'userService',
                    login: function (userService, $stateParams) {
                        return userService.getInfo($stateParams.login);
                    },
                    repo: function (userService, $stateParams) {
                        return userService.getRepo($stateParams.login);
                    },
                    followers: function (userService, $stateParams) {
                        return userService.getFollowers($stateParams.login);
                    }
                }
            })
            .state('repoState', {
                url: "/repoState/{login}",
                templateUrl: "repoState/repoState.html",
                controller: 'repoStateController',
                resolve: {

                    repoService: 'repoService',
                    login: function (repoService, $stateParams) {
                        return repoService.getRepoInfo($stateParams.login);
                    },
                    repo: function (repoService, $stateParams) {
                        return repoService.getRepo($stateParams.login);
                    }
                }
            })
        });
})();
