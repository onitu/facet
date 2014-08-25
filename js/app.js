/*
 * app.js for onitu
 * by lenorm_f
 */

"use strict";

var facetApp = angular.module("facetApp", [ "ngRoute", "facetFilters", "facetControllers", "restangular" ]);


facetApp.config([ "$routeProvider", "RestangularProvider",
	function ($rp, RestangularProvider) {
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
            controller: "driverAddCtrl",
		})
		.when("/driver/edit/:id", {
			templateUrl: "partials/driver_edit.html",
			controller: "driverEditCtrl",
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

	  RestangularProvider.setBaseUrl("http://localhost:3862/api/v1.0");
	}
]);
