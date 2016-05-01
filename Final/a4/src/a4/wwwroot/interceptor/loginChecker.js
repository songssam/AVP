(function () {
    'use strict';

    angular
        .module('app')
        .factory('myHttpInterceptor', myHttpInterceptor);

    function myHttpInterceptor($q, $injector) {

        return {
            'responseError': function (rejection) {
                var stateService = $injector.get("$state");

                if (rejection.status == 401) {
                    stateService.go('login');
                    toastr.error('The data will not be pulled', 'Please Login!');
                }

                return $q.reject(rejection);
            }
        };
    }
})();