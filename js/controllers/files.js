/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("filesListCtrl", [ "$scope", "$http", "$routeParams",
	function ($scope, $http, $rp) {
        var filter_array = function (a, t) {
            var ret = [];

            for (var i = 0; i < Object.keys(a).length; i++) {
                if (a[i].type === t) {
                    ret.push(a[i]);
                }
            }

            return ret;
        }
		// FIXME: get the files from the server
		var files = [
			{"filename": "/etc/passwd", "type": "other", "size": 1234, "owners": [ "Dropbox", "Secure Shell" ]},
            {"filename": "report_epitech.pdf", "type": "document", "size": 8964912, "owners": [ "Local", "Dropbox" ]},
			{"filename": "epitech.flv", "type": "video", "size": 0, "owners": [ "Local", "Secure Shell" ]},
            {"filename": "IMG_2389.jpg", "type": "picture", "size": 19345, "owners": [ "Dropbox" ]},
			{"filename": "nyan.ogg", "type": "music", "size": 10101010, "owners": [ "Local" ]},
		];

        // FIXME: ask the server not to return all the files ?
        var file_type = ($rp.hasOwnProperty("type") ? $rp.type : undefined);
        if (file_type !== undefined) {
            $scope.files = filter_array(files, file_type);
        } else {
            $scope.files = files;
        }

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
