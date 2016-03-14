(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);


    function homeController($scope) {
        $scope.title = 'homeController';

        activate();

        function activate() { }
    }
})();
