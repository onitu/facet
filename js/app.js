
"use strict";

var facetApp = angular.module("facetApp", [ "ngRoute", "facetFilters", "facetControllers" ]);

facetApp.config([ "$routeProvider",
	function ($rp) {
		$rp
		.when("/files", {
			templateUrl: "partials/files_list.html",
			controller: "filesListCtrl",
		})
		.when("/settings", {
			templateUrl: "partials/settings.html",
		})
		.when("/driver/list", {
			templateUrl: "partials/driver_list.html",
			controller: "driverListCtrl",
		})
		.when("/driver/add", {
			templateUrl: "partials/driver_add.html",
		})
		.when("/driver/edit/:id", {
			templateUrl: "partials/driver_edit.html",
		})
		.when("/documentation", {
			templateUrl: "partials/documentation.html",
		})
		.when("/contact", {
			templateUrl: "partials/contact.html",
		})
		.otherwise({
			redirectTo: "/files",
		});
	}
]);
