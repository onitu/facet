/*
 * drivers.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("driverListCtrl", [ "$rootScope", "$scope", "$http",
	function ($rootScope, $scope, $http) {
        // This function is used by the filesListCtrl controller
        $rootScope.driverToAwesomeClass = function (owner) {
            // FIXME: check owner type
            return {
                "dropbox": "fa-dropbox",
                "secure shell": "fa-terminal",
                "local": "fa-database",
            }[owner.toLowerCase()];
        }

		// FIXME: get the drivers from the server
		$scope.drivers = [
			{"name": "Secure Shell", "id": 0},
			{"name": "Dropbox", "id": 1},
			{"name": "Local", "id": 2},
		];
	}
]);

facetControllers.controller("driverEditCtrl", [ "$scope", "$routeParams",
	function ($scope, $routeParams) {
		// FIXME: get from the local drivers DB
		$scope.driver = {
			"name": "Unknown driver",
			"description": "Unknown driver's description",
			"id": $routeParams.id,
		}
	}
]);
