(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', searchController);

    function searchController($scope, $state, $http, $q, userService) {
        $scope.title = 'searchController';
        $scope.type = 1;
        $scope.search_box;
        $scope.showTable;
        $scope.check;
        activate();

        $scope.data = {

            saveData: []
        }

        $scope.goUserLink = function (login) {
            $state.go('userState', { login: login });
            console.log("login " + login);
        }
        $scope.goRepoLink = function (login) {
            $state.go('repoState', { login: login });
            console.log("repo " + login);
        }

        $scope.totalItems = 100;


        $scope.maxSize = 10;
        $scope.bigTotalItems = 1000;
        $scope.bigCurrentPage = 1;
        $scope.numPages;

        $scope.pageChanged = function (bigCurrentPage) {
            $scope.bigCurrentPage = bigCurrentPage;
            console.log("clicked" + bigCurrentPage);
        };

        $scope.updateSearch = function () {
            console.log($scope.bigCurrentPage);

            $scope.showTable = 0;
            if ($scope.type == 1) {
                getUser().then(
                  function (imageUrl) {
                      $scope.data.saveData = imageUrl.items;
                      $scope.check = imageUrl.total_count;
                      console.log(' DATA ' + $scope.data.saveData);
                      if ($scope.check == 0) {
                          console.log(' check ' + $scope.check);
                          if ($scope.check / 10 >= 100) {
                              $scope.numPages = 100;
                          }
                          else {
                              $scope.numPages = $scope.check / 10;
                          }
                          $scope.showTable = 7;
                      }

                  });
            }
            else if ($scope.type == 2) {
                getRepository().then(
                  function (imageUrl) {
                      $scope.data.saveData = imageUrl.items;
                      $scope.check = imageUrl.total_count;
                      console.log(' DATA ' + $scope.data.saveData);
                      if ($scope.check == 0) {
                          console.log(' check ' + $scope.check);
                          $scope.showTable = 7;
                      }
                  });
            }
            console.log($scope.data.saveData + ' Noresult');
        }

        function getUser() {
            var deferred = $q.defer();
            $http.get('https://api.github.com/search/users?q=' + $scope.search_box + '&page=' + $scope.bigCurrentPage + '&per_page=10').then(


            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('https://api.github.com/search/users?q=' + $scope.search_box + '&page=' + $scope.bigCurrentPage + '&per_page=10')
                deferred.resolve(response.data);
                $scope.type = 1;
                $scope.showTable = 1;

            });
            return deferred.promise;
        }

        function getRepository() {
            var deferred = $q.defer();
            $http.get('https://api.github.com/search/repositories?q=' + $scope.search_box + '&page=' + $scope.bigCurrentPage + '&per_page=10').then(
                function (response) {
                    console.log('github response repository');
                    console.log($scope.search_box);
                    console.log('https://api.github.com/search/repositories?q=' + $scope.search_box + '&page=' + $scope.bigCurrentPage + '&per_page=10');
                    deferred.resolve(response.data);
                    $scope.type = 2;
                    $scope.showTable = 2;
                });
            return deferred.promise;
        }

        function activate() { }
    }
})();