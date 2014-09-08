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
                "secure shell": "fa-wifi",
                "local": "fa-database",
            }[owner.toLowerCase()];
        }

		// FIXME: get the drivers from the server
		$scope.drivers = [
			{"name": "Dropbox", "description": "My main account on dropbox", "id": 0},
			{"name": "Local", "description": "My backup folder on my external hard-drive", "id": 1},
			{"name": "Secure Shell", "description": "My VPS in the USA", "id": 2},
		].sort();
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
