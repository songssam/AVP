(function () {
    'use strict';

    angular
        .module('app')
        .controller('searchController', searchController);

    function searchController($scope, $state, $http, $q) {
        $scope.title = 'searchController';
        $scope.type = 1;
        $scope.search_box;
        $scope.deleteId;
        $scope.check;
        $scope.sortType = 'description';
        $scope.sortReverse = false;
        $scope.searchTodo = '';
        $scope.day = 0;
        $scope.hour = 48;
        $scope.calcHour = 0;
        $scope.init = 0;

        $scope.data = {
            saveData: [],
            saveAlarm: []
        }
        // get Time function
        console.log('111 ' + $scope.hour + ' ' + $scope.day)

        $scope.alarmSet = function () {

            var now = moment(new Date());
            if ($scope.day != 0) {
                $scope.calcHour = $scope.hour + $scope.day * 24;
                console.log('111 ' + $scope.calcHour + ' ' + $scope.day)
            }
            else {
                $scope.calcHour = $scope.hour;
            }
            var setTime = moment(new Date());
            setTime = setTime.add($scope.calcHour, 'hours');

            for (var i = 0; i < $scope.data.saveData.length; i++) {
                $scope.data.saveData[i].check = '';
                var dueDateFromDB = $scope.data.saveData[i].dueDate;
                // Diff btwn today and due
                var diffFromToday = moment.duration(now.diff(dueDateFromDB));
                var hours = diffFromToday.asHours();
                if (hours >= 0) {
                    $scope.data.saveData[i].check = 'Red';
                }
                // Diff btwn set and due
                var diffToSet = moment.duration(setTime.diff(dueDateFromDB));


                var hours1 = diffToSet.asHours();
                if (hours < 0 && hours1 > 0) {
                    $scope.data.saveData[i].check = 'Yellow';
                }
            }
        }

        readResult().then(
           function (imageUrl) {
               $scope.data.saveData = imageUrl;
               for (var i = 0; i < $scope.data.saveData.length; i++) {
                   var localTime = moment($scope.data.saveData[i].dueDate).local().format('YYYY-MM-DD hh:mm A');
                   $scope.data.saveData[i].dueDate = localTime;
               }
               if ($scope.init == 0) {
                   console.log('before' + $scope.init)
                   $scope.init = 1;
                   console.log('after' + $scope.init)
                   $scope.alarmSet();
               }
           });

        // pass too update
        $scope.updateResult = function (login) {
            $state.go('update', { login: login });
            console.log("login " + login);
        }

        $scope.updateSearch = function () {

            $scope.showTable = 0;
            readResult().then(
              function (imageUrl) {
                  $scope.data.saveData = imageUrl;
                  console.log(' DATA ' + $scope.data.saveData);
                  $scope.alarmSet();

              });
        }

        function readResult() {
            var deferred = $q.defer();

            if ($scope.search_box != null) {
                $http.get('http://localhost:35000/api/project/tag/' + $scope.search_box).then(

               function handleSuccess(response) {
                   console.log('Hurray!');
                   console.log('http://localhost:35000/api/project/tag/')
                   deferred.resolve(response.data);
               });
            }
            else {
                $http.get('http://localhost:35000/api/project').then(

                function handleSuccess(response) {
                    console.log('Hurray!');
                    console.log('http://localhost:35000/api/project/tag/')
                    deferred.resolve(response.data);
                });

            }
            return deferred.promise;

        }

        $scope.deleteResult = function (realID) {
            $scope.dealID = realID;
            getResult().then(
              function () {
                  console.log(' DATA ' + $scope.data.saveData);
                  console.log(' here ' + $scope.dealID)
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

        function activate() { }
    }
})();
