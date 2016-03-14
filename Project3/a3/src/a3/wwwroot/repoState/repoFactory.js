(function () {
    'use strict';

    angular
        .module('app')
        .factory('repoService', repoService);


    function repoService($http, $q) {
        var service = {
            getRepoInfo: getRepoInfo,
            getRepo: getRepo
        };
        return service;

        function getRepoInfo(login) {

            var deferred = $q.defer();
            $http.get('https://api.github.com/repos/' + login).then(
                function (response) {
                    console.log('github response user STATE info ' + login);
                    console.log('https://api.github.com/repos/' + login);
                    console.log('There ' + response.data);
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }

        function getRepo(repo) {

            var deferred = $q.defer();
            $http.get('https://api.github.com/repos/' + repo + '/commits').then(
                function (response) {
                    console.log('github response user STATE repo ' + repo);
                    console.log('https://api.github.com/repos/' + repo + '/commits');
                    console.log('There2 ' + response.data);
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }

    }
})();