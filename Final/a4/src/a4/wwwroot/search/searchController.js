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
        $scope.hour = 0;

        $scope.calledId;
        $scope.calledTime;
        $scope.calledUsername;

        $scope.dbDay;
        $scope.dbHour;
        $scope.calcHour = 0;
        $scope.init = 0;

        $scope.data = {
            saveData: [],
            alarmInfo: []
        }
        // get Time function
        console.log('111 ' + $scope.hour + ' ' + $scope.day)

       
       getTodo().then(
                function (info) {

                    console.log('am i called')
                    console.log($scope.data.saveData.length)
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
                    }});
      
        // pass too update
        $scope.updateResult = function (login) {
            $state.go('update', { login: login });
            console.log("login " + login);
        }
   function readResult() {
            var deferred = $q.defer();

            if ($scope.search_box != null) {
                $http.get('/api/todo/tag/' + $scope.search_box).then(

               function handleSuccess(response) {
                   deferred.resolve(response.data);
               });
            }
            else {
                $http.get('/api/todo').then(

                function handleSuccess(response) {
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
            $http.delete('/api/todo/' + $scope.dealID).then(

            function handleSuccess(response) {
                console.log('Hurray!');
                console.log('/api/todo' + $scope.dealID)
            },
             function handleError(response) {
                 toastr.success('Register was successful', 'Good Job!');
             });
            return deferred.promise;
        }
         getWarning().then(
            function (info) {
                $scope.data.alarmInfo = info;
                console.log('check ' + $scope.data.alarmInfo[0].userName);
                $scope.calledId = $scope.data.alarmInfo[0].id;
                $scope.calledTime = $scope.data.alarmInfo[0].time;
                $scope.calledUsername = $scope.data.alarmInfo[0].userName;

            });

        function getWarning() {
            var deferred = $q.defer();
            $http.get('/api/warning').then(
                function handleSuccess(response) {
                    deferred.resolve(response.data);
                });
            return deferred.promise;
        }
        $scope.warningUpdate = function warningUpdate() {
            if ($scope.day != 0 || $scope.data == null) {
                $scope.calcHour = $scope.hour + $scope.day * 24;
                console.log('111 ' + $scope.calcHour + ' ' + $scope.day)
            }
            else {
                $scope.calcHour = $scope.hour;
            }

            var item = {
                "id": $scope.calledId,
                "time": $scope.calcHour,
            }

            console.log('clicked ' + $scope.calcHour)
            $http.put("/api/warning/", item);
            
            location.reload();

        }
    
        $scope.updateSearch = function updateResult() {
            console.log('update called')
            getTodo().then(
                function (info) {

                    console.log('am i called')
                    console.log($scope.data.saveData.length)
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
                    }});
        }
            function getTodo() {
                var deferred = $q.defer();
                console.log('get to do is called');
                if ($scope.search_box != null) {
                    $http.get('/api/todo/tag/' + $scope.search_box).then(

                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    });
                }
                else {
                    $http.get('/api/todo').then(
                        function handleSuccess(response) {
                            deferred.resolve(response.data);
                        });
                }
                return deferred.promise;
            }
     }
})();
