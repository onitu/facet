/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

var facetControllers = angular.module("facetControllers", []);

facetControllers.controller("filesListCtrl", [ "$scope", "$http",
	function ($scope, $http) {
		// FIXME: get the files from the server
		$scope.files = [
			{"filename": "/etc/passwd", "type": "other", "size": 1234, "owners": [ "Dropbox", "Secure Shell" ]},
			{"filename": "epitech.flv", "type": "video", "size": 0, "owners": [ "Secure Shell", "Local" ]},
            {"filename": "IMG_2389.jpg", "type": "picture", "size": 19345, "owners": [ "Dropbox" ]},
			{"filename": "42.zip", "type": "other", "size": 10101010, "owners": [ "Local" ]},
		];

        $scope.fileTypeToAwesomeClass = function (filetype) {
            // FIXME: check file type
            return {
                "picture": "fa-picture-o",
                "video": "fa-film",
                "music": "fa-music",
                "document": "fa-font",
                "other": "fa-file",
            }[filetype.toLowerCase()];
        }
	}
]);
