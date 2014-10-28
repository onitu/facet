/*
 * app.js for onitu
 * by lenorm_f
 */

"use strict";

var facetApp = angular.module("facetApp", [ "ngRoute", "facetFilters", "facetControllers", "facetFactories", "restangular" ]);
var facetControllers = angular.module("facetControllers", []);
var facetFactories = angular.module("facetFactories", []);

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
        .when("/files/:drivername/:filename", {
            templateUrl: "partials/file_details.html",
            controller: "fileDetailsCtrl",
        })
        .when("/drivers/info/:name", {
            templateUrl: "partials/driver_info.html",
            controller: "driverInfoCtrl",
        })
        .when("/drivers/edit/:name", {
            templateUrl: "partials/driver_edit.html",
            controller: "driverEditCtrl",
        })
        .when("/drivers/add", {
            templateUrl: "partials/driver_add.html",
            controller: "driverAddCtrl",
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
