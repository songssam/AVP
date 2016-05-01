(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController($scope, $state, $http) {
        /* jshint validthis:true */
        $scope.title = 'loginController';

        $scope.signIn = function signIn() {
            console.log('WOW')
            updateData();
        };

        function updateData() {
            console.log('WOW1')
            var item = {
                "userName": $scope.username,
                "password": $scope.password
            }

            console.log('I am called')

            $http.post('/api/login/', item).then(
                function handleSuccess(response) {
                    console.log('Login success');
                    toastr.success('Good guessing of ID and password', 'Good Job!');
                    $state.go('search');
                },
                function handleError(response) {
                    console.log($scope.username + $scope.password)

                    console.log('Login fail');
                    toastr.error('ID and password do not match!!', 'Warning!');
        }
            )}
    }


})();