
"use strict";

var facet = angular.module("facetApp", []);

facet.controller("DriverListCtrl", function ($scope) {
	// FIXME: get the drivers from the server
	$scope.drivers = [
		{"name": "Secure Shell"},
		{"name": "Dropbox"},
		{"name": "Local"},
	];
});
