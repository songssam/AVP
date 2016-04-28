(function () {
    'use strict';

    angular
        .module('app')
        .controller('updateController', function getuserStateController(login, $state, $scope, $q, $http) {
            $scope.login = login;
            $scope.type = "Active";
            $scope.data;
            $scope.update;


            $scope.change = function () {
                updateData();
                console.log('Hello');
            }

            readResult().then(
              function (imageUrl) {
                  $scope.data = imageUrl;
                      var localTime = moment($scope.data.dueDate).local().format('YYYY-MM-DD HH:mm');
                      $scope.data.dueDate = localTime;
                      console.log(' DATA ' + $scope.data);
                  }
              );

            function readResult() {
                var deferred = $q.defer();
                $http.get('/api/project/' + $scope.login.login).then(

                function handleSuccess(response) {
                    console.log('/api/project/' + $scope.login.login)
                    console.log('check' + $scope.data)
                    deferred.resolve(response.data);
                });
                return deferred.promise;
            }

            function updateData() {
                console.log('here' + $scope.login.login)
                var item = {
                    "id": $scope.login.login,
                    "tags": $scope.add_tags,
                    "description": $scope.add_desc,
                    "dueDate": $scope.add_year + '-' + $scope.add_month + '-' + $scope.add_day + 'T' + $scope.add_hour + ':' + $scope.add_minute + ':00',
                    "state": $scope.type
                }
                console.log('I am called')

                if (!isNaN($scope.add_year) && !isNaN($scope.add_month) && !isNaN($scope.add_day) && !isNaN($scope.add_hour) && !isNaN($scope.add_minute)) {
                    $http.put('/api/project/', item);
                    $state.go('search');
                    location.reload();

                }
            }
        }
     )
})();