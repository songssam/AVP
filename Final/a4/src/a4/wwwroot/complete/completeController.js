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


        getTodo().then(
                 function (info) {

                     console.log('am i called')
                     $scope.data.saveData = info;

                     for (var a = 0; a < $scope.data.saveData.length; a++) {
                         var currentTime = moment.utc(info[a].dueDate).local();
                         var realTime = moment.utc(info[a].dueDate).local().format('YYYY-MM-DD hh:mm A');

                         $scope.data.saveData[a].dueDate = realTime;

                         var diffTime = moment().add($scope.calledTime, 'hours');


                         $scope.data.saveData[a].check = '';

                         if (currentTime.isBefore(moment())) {
                             $scope.data.saveData[a].check = 'red';
                         }

                         if (diffTime.isBefore(currentTime)) {
                             $scope.data.saveData[a].check = 'yellow';
                         }
                     }
                 });
        
        function getTodo() {
            var deferred = $q.defer();
            console.log('get to do is called');
                            $http.get('/api/todo').then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    });
            
            return deferred.promise;
        }

        function readResult() {
            var deferred = $q.defer();
            $http.get('/api/project').then(

            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('/api/project')
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
            $http.delete('/api/todo/' + $scope.dealID).then(

            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('/api/todo/' + $scope.dealID)
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    }
})();
