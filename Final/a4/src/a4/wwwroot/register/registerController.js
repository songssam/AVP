(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    function registerController($scope, $state, $http, $q) {
        /* jshint validthis:true */
        $scope.title = 'registerController';

        $scope.register = function register() {
            updateData();
        };

        var validated = true;
        function updateData() {
            var item = {
                "UserName": $scope.username,
                "password": $scope.password
            }

            console.log('Register am called')

            if ($scope.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)) {
                validated = true;
            }
            else {
                toastr.error('At least 8 charcters, Uppercase, Lowercase, Digit required', 'Bad Job!');
                validated = false;
            }
           
            if(validated){
                $http.post('/api/login/register', item).then(
                function handleSuccess(response) {
                    if (response.data.succeeded == true) {
                        toastr.success('Register was successful', 'Good Job!');
                        $state.go('login');
                    }
                    else{
                        toastr.error(response.data.errors[0].description, 'Warning');
                    }
            });

           
        }

        }
    }

})();