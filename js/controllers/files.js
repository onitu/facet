/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("filesListCtrl", [ "$rootScope", "$scope", "$routeParams", "$location", "filesFactory",
	function ($rootScope, $scope, $routeParams, $location, filesFactory) {
        $scope.fileTypeToAwesomeClass = function (filetype) {
            var awesome_class_ref = {
                "file": "fa-file-o",
                "archive": "fa-file-archive-o",
                "audio": "fa-file-audio-o",
                "code": "fa-file-code-o",
                "excel": "fa-file-excel-o",
                "image": "fa-file-image-o",
                "pdf": "fa-file-pdf-o",
                "powerpoint": "fa-file-powerpoint-o",
                "text": "fa-file-text-o",
                "video": "fa-file-video-o",
                "word": "fa-file-word-o",
            }

            filetype = filetype.toLowerCase();
            if (filetype in awesome_class_ref) {
                return awesome_class_ref[filetype];
            } else {
                return awesome_class_ref["file"];
            }
        }

        $scope.displayFile = function (file) {
            $location.path("/files/" + file.uptodate[0] + "/" + file.filename + "/info");
        }

        if ($rootScope.files === undefined) {
            filesFactory.getFiles($routeParams.type).then(function (files) {
                $rootScope.files = files;
            });
        }
	}
]);

facetControllers.controller("fileDetailsCtrl", [ "$rootScope", "$scope", "$routeParams", "filesFactory",
    function ($rootScope, $scope, $routeParams, filesFactory) {
        var drivername = $routeParams.drivername;
        var filename = $routeParams.filename;

        var find_file = function (drivername, filename) {
            $.each($rootScope.files, function (_, file) {
                if (file.filename === filename && file.uptodate.indexOf(drivername) > -1) {
                    $scope.file = file;

                    $.each($rootScope.drivers, function (_, driver) {
                        if (driver.name === drivername) {
                            $scope.driver = driver;

                            return false;
                        }
                    });

                    return false;
                }
            });
        }

        // If the files were not fetched beforehand, update the global cache
        if ($rootScope.files === undefined) {
            filesFactory.getFiles().then(function (files) {
                $rootScope.files = files;
                find_file(drivername, filename);
            });
        } else {
            find_file(drivername, filename);
        }
    }
]);
