(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeController', completeController);


    function completeController($scope, $http, $q) {
        $scope.title = 'completeController';
        $scope.data = {
            saveData: []
        }


        // time format
        readResult().then(
          function (imageUrl) {
              $scope.data.saveData = imageUrl;
              for (var i = 0; i < $scope.data.saveData.length; i++) {
                  var localTime = moment($scope.data.saveData[i].dueDate).local().format('YYYY-MM-DD hh:mm A');
                  $scope.data.saveData[i].dueDate = localTime;
              }
              console.log(' DATA ' + $scope.data.saveData);
          });

        // get values
        $scope.updateSearch = function () {

            $scope.showTable = 0;
            readResult().then(
              function (imageUrl) {
                  $scope.data.saveData = imageUrl;
                  console.log(' DATA ' + $scope.data.saveData);
              });
            console.log($scope.data.saveData + ' Noresult');
        }

        function readResult() {
            var deferred = $q.defer();
            $http.get('http://localhost:35000/api/project').then(

            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('http://localhost:35000/api/project')
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }

        // Delete
        $scope.deleteResult = function (realID) {
            $scope.dealID = realID;
            getResult().then(
              function () {
                  $scope.updateSearch();
              });

            console.log($scope.data.saveData + ' Noresult');
        }

        function getResult() {
            var deferred = $q.defer();
            $http.delete('http://localhost:35000/api/project/' + $scope.dealID).then(

            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('http://localhost:35000/api/project' + $scope.dealID)
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();
