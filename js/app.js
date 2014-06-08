
"use strict";

var facetApp = angular.module("facetApp", [ "ngRoute", "facetFilters", "facetControllers" ]);

facetApp.config([ "$routeProvider",
	function ($rp) {
		$rp.when("/driver/add", {
			templateUrl: "partials/add_driver_form.html",
			// FIXME: controller: "",
		})
		$rp.when("/files", {
			templateUrl: "partials/files_list.html",
			controller: "filesListCtrl",
		})
		.otherwise({
			redirectTo: "/files",
		});
	}
]);
