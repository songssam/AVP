(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoStateController', function getrepoStateController(login, repo, userService, $scope, $q, $http) {
            $scope.login = login;
            $scope.repo = repo;
            $scope.issueName ={};
            $scope.showTable;

            $scope.data = {
                saveData: [],
                saveIssues: []
            }
            

            $scope.data.saveData = repo;

         
            $scope.maxSize = 10;
            $scope.bigTotalItems = $scope.login.open_issues_count;
            $scope.bigCurrentPage = 1;
            $scope.numPages;
            if ($scope.login.open_issues_count == 0) {
                $scope.showTable = 0;
            }
            else {
                $scope.showTable = 1;
            }
                getIssue().then(
                     function (issueName) {
                         $scope.data.saveIssues = issueName;
                         console.log('BAAAM' + issueName);
                         if ($scope.check == 0) {
                         }
                     });
            $scope.updateIssue = function () {
                getIssue().then(
                     function (issueName) {
                         $scope.data.saveIssues = issueName;
                         console.log('BAAAM' + issueName);
                         if ($scope.check == 0) {
                         }
                     });
            }
            function getIssue() {
                var deferred = $q.defer();
                $http.get('https://api.github.com/repos/' + $scope.login.full_name + '/issues?page=' + $scope.bigCurrentPage + '&per_page=10').then(
                    function (response) {
                        console.log('github response user STATE info 1111 ' + $scope.login.full_name);
                        console.log('>>>>> https://api.github.com/repos/' + $scope.login.full_name + '/issues?page=' + $scope.bigCurrentPage + '&per_page=10');
                        console.log('There 111' + response.data);
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            function activate() { }

        }
     )
})();
