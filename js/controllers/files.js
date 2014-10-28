/*
 * files.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("filesListCtrl", [ "$rootScope", "$scope", "$routeParams", "filesFactory",
	function ($rootScope, $scope, $routeParams, filesFactory) {
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

        if ($rootScope.files === undefined) {
            filesFactory.getFiles($routeParams.type).then(function (files) {
                $rootScope.files = files;
            });
        }
	}
]);

facetControllers.controller("fileDetailsCtrl", [ "$rootScope", "$scope", "$routeParams", "filesFactory",
    function ($rootScope, $scope, $routeParams, filesFactory) {
        var fid = $routeParams.fid;
        var find_file = function (fid) {
            $.each($rootScope.files, function (_, file) {
                if (file.fid === fid) {
                    $scope.file = file;

                    $.each($rootScope.drivers, function (_, driver) {
                        if (file.uptodate.indexOf(driver.name) > -1) {
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
                find_file(fid);
            });
        } else {
            find_file(fid);
        }
    }
]);
