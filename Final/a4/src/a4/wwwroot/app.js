(function () {
    'use strict';

    angular.module('app', [
            // Angular modules 
            'ui.bootstrap',
            // Custom modules 
            'ui.router',
            // 3rd Party Modules
            'ui.bootstrap.showErrors'
    ])
        .controller('appController', function ($rootScope, $state) {

        })
        .config(function ($provide) {
            $provide.decorator('$exceptionHandler', function extendExceptionHandler($delegate) {
                return function (exception, cause) {
                    $delegate(exception, cause);

                    /**
                     * Could add the error to a service's collection,
                     * add errors to $rootScope, log errors to remote web server,
                     * or log locally. Or throw hard. It is entirely up to you.
                     * throw exception;
                     */
                    //                myToastr.warning(exception.message);
                };
            });



        });
})();