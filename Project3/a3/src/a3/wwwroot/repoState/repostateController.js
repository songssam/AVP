(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoStateController', function getrepoStateController(login, repo, userService, $scope, $q, $http) {
            $scope.login = login;
            $scope.repo = repo;
            $scope.data = {
                saveData:[]
            }
            
            $scope.data.saveData = repo;
            function activate() { }

        }
     )
})();
