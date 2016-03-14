(function () {
    'use strict';

    angular
        .module('app')
        .controller('userStateController', function getuserStateController(followers, login, repo, userService, $state, $scope, $q, $http) {
            $scope.login = login;
            $scope.repo = repo;
            $scope.followers = followers;
           
            $scope.data = {

                saveData: []
            }

            $scope.followers = {
                saveFollowers: []
            }

            $scope.data.saveData = repo;
            $scope.followers.saveFollowers = followers;

            $scope.goRepoLink = function (login) {
                $state.go('repoState', { login: login });
                console.log("repo " + login);
            }
            function activate() { }

        }
     )
})();
