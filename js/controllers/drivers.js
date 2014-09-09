/*
 * drivers.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("driverListCtrl", [ "$rootScope", "$scope", "$http", "Restangular",
	function ($rootScope, $scope, $http, Restangular) {
        // This function is used by the filesListCtrl controller
        $rootScope.driverNameToAwesomeClass = function (owner) {
            var awsm_class;
            var awsm_class_ref = {
                "amazon_s3": "fa-cube",
                "local_storage": "fa-database",
            };

            $.each($rootScope.drivers, function (_, driver) {
                if (owner === driver.name) {
                    awsm_class = awsm_class_ref[driver.driver];

                    return false;
                }
            });

            return awsm_class;
        }

        Restangular.one("entries").get().then(function (drivers) {
            $rootScope.drivers = drivers.entries;
        });
	}
]);

facetControllers.controller("driverEditCtrl", [ "$rootScope", "$scope", "$routeParams",
	function ($rootScope, $scope, $routeParams) {
        var driver_name = $routeParams.name;

        $.each($rootScope.drivers, function (_, driver) {
            if (driver.name === driver_name) {
                $scope.driver = driver;
                return false;
            }
        });
	}
]);
