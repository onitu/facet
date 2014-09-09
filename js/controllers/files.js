/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("filesListCtrl", [ "$scope", "$http", "$routeParams", "Restangular",
	function ($scope, $http, $rp, Restangular) {
        var filter_array = function (files, type) {
            var ret = [];

            $.each(files, function (_, file) {
                if (file.type === type) {
                    ret.push(file);
                }
            });

            return ret;
        }
        var assign_filetypes = function (files) {
            $.each(files, function (_, file) {
                var dot_idx = file.filename.lastIndexOf(".");
                // FIXME: add more file extensions
                var ext_ref = {
                    "document": [
                        "doc", "docx", "pdf",
                    ],
                    "music": [
                        "mp3", "ogg", "flac",
                    ],
                    "picture": [
                        "bmp", "jpg", "png",
                    ],
                    "video": [
                        "mp4", "mpeg", "3gp",
                    ],
                };

                file.type = "other";

                // The ".{ext}" case is voluntarily ignored
                if (dot_idx > 0) {
                    var ext = file.filename.substr(dot_idx + 1);

                    $.each(ext_ref, function (type, exts) {
                        if (exts.indexOf(ext) > 0) {
                            file.type = type;
                            return false;
                        }
                    });
                }
            });

            return files;
        }

        Restangular.one("files").get().then(function (files) {
            var files = assign_filetypes(files.files);

            // FIXME: ask the server not to return all the files ?
            var file_type = ($rp.hasOwnProperty("type") ? $rp.type : undefined);
            if (file_type !== undefined) {
                files = filter_array(files, file_type);
            } else {
                files = files;
            }

            $scope.files = files.sort(function (a, b) {
                // FIXME
                return 0;
            });
        });


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
