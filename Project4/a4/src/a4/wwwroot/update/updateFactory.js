(function () {
    'use strict';

    angular
        .module('app')
        .factory('updateService', updateService);

    function updateService($http, $q) {
        var service = {
            getInfo: getInfo
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

    }
})();