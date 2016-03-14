(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoStateController', function getrepoStateController(login, repo, userService, $scope, $q, $http) {
            $scope.login = login;
            $scope.repo = repo;
            $scope.issueName ={};


            $scope.data = {
                saveData: []
            }
            $scope.issues = {
                saveIssues: []
            }

            $scope.data.saveData = repo;

            console.log('Y U P ' + userService);

         
            $scope.maxSize = 10;
            $scope.bigTotalItems = $scope.login.open_issues_count;
            $scope.bigCurrentPage = 1;
            $scope.numPages;

          
            getIssue().then(
                 function (issueName){
                     $scope.issues.saveIssues = issueName;
                     console.log('BAAAM' + issueName);
                     if ($scope.check == 0) {
                     }
                 });
            
            function getIssue() {
                var deferred = $q.defer();
                $http.get('https://api.github.com/repos/' + $scope.login.full_name + '/issues?page=' + $scope.bigCurrentPage + '&per_page=10').then(
                    function (response) {
                        console.log('github response user STATE info 1111 ' + $scope.login.full_name);
                        console.log('>>>>>>> https://api.github.com/repos/' + $scope.login.full_name + '/issues?page=' + $scope.bigCurrentPage + '&per_page=10');
                        console.log('There 111' + response.issues);
                        deferred.resolve(response.issues);
                    });
                return deferred.promise;
            }

            function activate() { }

        }
     )
})();
