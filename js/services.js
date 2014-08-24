/*
 * services.js for onitu
 * by lenorm_f
 */

"use strict";

var facetServices = angular.module("facetServices", [ "ngResource" ]);

facetServices.factory("File", [ "$resource",
	function ($resource) {
		// FIXME: fetch from the server
		return $resource("/files", {}, {});
	}
]);
