(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    function userService($http, $q) {
        var service = {
            getInfo: getInfo,
            getRepo: getRepo,
            getFollowers: getFollowers   
        };
        return service;

        function getInfo(login) {

            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + login).then(
                function (response) {
                    console.log('github response user STATE info ' + login);
                    console.log('https://api.github.com/users/' + login);
                    console.log('There ' + response.data);
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }

        function getRepo(repo) {

            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + repo + '/repos').then(
                function (response) {
                    console.log('github response user STATE repo ' + repo);
                    console.log('https://api.github.com/users/' + repo + '/repos');
                    console.log('There2 ' + response.data);
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }
        
        function getFollowers(followers) {

            var deferred = $q.defer();
            $http.get('https://api.github.com/users/' + followers + '/followers').then(
                function (response) {
                    console.log('github response user STATE followers ' + followers);
                    console.log('https://api.github.com/users/' + followers + '/followers');
                    console.log('There3 ' + response.data);
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }
    }
})();