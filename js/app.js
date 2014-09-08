/*
 * app.js for onitu
 * by lenorm_f
 */

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
	}
]);
