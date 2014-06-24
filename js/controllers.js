/*
 * controllers.js for onitu
 * by lenorm_f
 */

"use strict";

var facetControllers = angular.module("facetControllers", []);

facetControllers.controller("driverListCtrl", [ "$scope", "$http",
	function ($scope, $http) {
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

facetControllers.controller("filesListCtrl", [ "$scope", "$http",
	function ($scope, $http) {
		// FIXME: get the files from the server
		$scope.files = [
			{"filename": "/etc/passwd", "size": "1234", "owners": [ "Dropbox" ]},
			{"filename": "42.zip", "size": "10101010", "owners": [ "Local" ]},
			{"filename": "xxx.flv", "size": "0", "owners": [ "Google Drive" ]},
		];
	}
]);

facetControllers.controller("navbarCtrl", [ "$scope", "$location",
	function ($scope, $location) {
		// XXX: corner case: path == "/", $location.path() == "/smt/1/2/3" will return true
		$scope.isActive = function (path) {
			return $location.path().substr(0, path.length) === path;
		}
	}
]);
