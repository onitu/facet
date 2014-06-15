
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

facetControllers.controller("navbarCtrl", [ "$scope", "$location",
	function ($scope, $location) {
		// XXX: corner case: path == "/", $location.path() == "/smt/1/2/3" will return true
		$scope.isActive = function (path) {
			return $location.path().substr(0, path.length) === path;
		}
	}
]);
