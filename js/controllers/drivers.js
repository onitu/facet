/*
 * drivers.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("driverListCtrl", [ "$rootScope", "$scope", "Restangular",
	function ($rootScope, $scope, Restangular) {
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

facetControllers.controller("driverInfoCtrl", [ "$scope", "$routeParams", "Restangular",
    function ($scope, $rp, Restangular) {
        var driver_name = $rp.name;

      $scope.showButtonOAuth = false;
      Restangular.one('entries', driver_name).one('oauth2url').get().then(function (url) {
	$scope.showButtonOAuth = true;
	$scope.oauthurl = url;
      });

      Restangular.one("entries", driver_name).one("stats").get().then(function (stats) {
        stats.time = Math.floor(stats.time * 1000);
        $scope.stats = stats;
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
