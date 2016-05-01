(function () {
    'use strict';

    angular
        .module('app')
        .controller('addController', addController)

    function addController($scope, $http, $q, $state) {
        $scope.title = 'addController';
        $scope.type = 'Active';
        
        $scope.createTodo = function () {
            
            console.log(' 1234 ' + $scope.add_year + $scope.add_month);
            console.log($scope.add_month);
            addData();
        }
        
        function addData() {
            var item = {
                "tags": $scope.add_tags,
                "description": $scope.add_desc,
                "dueDate": $scope.add_year + '-' + $scope.add_month + '-' + $scope.add_day + 'T' + $scope.add_hour + ':' + $scope.add_minute + ':00',
                "state": $scope.type
            };

            if (!isNaN($scope.add_year) && !isNaN($scope.add_month) && !isNaN($scope.add_day) && !isNaN($scope.add_hour) && !isNaN($scope.add_minute)) {

                $http.post('/api/todo/', item);
                $state.go('search');
            //    location.reload();
            }
        }
    }
})();
