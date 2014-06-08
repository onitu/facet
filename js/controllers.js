
"use strict";

var facetControllers = angular.module("facetControllers", []);

facetControllers.controller("driverListCtrl", [ "$scope", "$http",
	function ($scope, $http) {
		// FIXME: get the drivers from the server
		$scope.drivers = [
			{"name": "Secure Shell"},
			{"name": "Dropbox"},
			{"name": "Local"},
		];
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
