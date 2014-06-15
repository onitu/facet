
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
		.when("/driver", {
			templateUrl: "partials/drivers.html",
		})
		.when("/driver/add", {
			templateUrl: "partials/driver_add.html",
			// FIXME: controller: "",
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
