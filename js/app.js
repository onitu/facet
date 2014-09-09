/*
 * app.js for onitu
 * by lenorm_f
 */

"use strict";

var facetApp = angular.module("facetApp", [ "ngRoute", "facetFilters", "facetControllers", "restangular" ]);
var facetControllers = angular.module("facetControllers", []);

facetApp.config([ "$routeProvider", "RestangularProvider",
	function ($rp, RestangularProvider) {
		$rp
		.when("/files", {
			templateUrl: "partials/files_list.html",
			controller: "filesListCtrl",
		})
		.when("/files/:type", {
			templateUrl: "partials/files_list.html",
			controller: "filesListCtrl",
		})
        // FIXME: use the driver name in the url ?
        .when("/drivers/edit/:id", {
            templateUrl: "partials/driver_edit.html",
            controller: "driverEditCtrl",
        })
		.when("/settings", {
			templateUrl: "partials/settings.html",
			controller: "settingsFormCtrl",
		})
		.when("/faq", {
			templateUrl: "partials/faq.html",
		})
		.when("/contact", {
			templateUrl: "partials/contact.html",
			controller: "contactFormCtrl",
		})
		.otherwise({
			redirectTo: "/files",
		});

        RestangularProvider.setBaseUrl("http://localhost:3862/api/v1.0/");
	}
]);
