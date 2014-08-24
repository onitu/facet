/*
 * controllers.js for onitu
 * by lenorm_f
 */

"use strict";

var facetControllers = angular.module("facetControllers", []);

facetControllers.controller("driverAddCtrl", [ "$rootScope", "$scope", "$http",
    function ($rootScope, $scope, $http) {
        $scope.addDriver = function (settings) {
            // FIXME: get id back form the server
            var id = 42;

            // FIXME: await validation from the server
            // FIXME: send to the server
            $rootScope.drivers.push({
                "name": settings.name,
                "description": settings.description,
                "id": id,
            });
        };
    }
]);

facetControllers.controller("driverListCtrl", [ "$rootScope", "$scope", "$http",
	function ($rootScope, $scope, $http) {
        $rootScope.$watch("drivers", function (_, new_val) {
            $scope.drivers = new_val;
        });

		// FIXME: get the drivers from the server
		$rootScope.drivers = [
			{"name": "Secure Shell", "description": "SSH driver", "id": 0},
			{"name": "Dropbox", "description": "DropBox driver", "id": 1},
			{"name": "Local", "description": "Local file system driver", "id": 2},
			{"name": "Google Drive", "description": "Google's file sharing platform", "id": 3},
		];
	}
]);

facetControllers.controller("driverEditCtrl", [ "$rootScope", "$scope", "$routeParams",
	function ($rootScope, $scope, $routeParams) {
        var driver_id = parseInt($routeParams.id, 10);

        // FIXME: check the id passed
        for (var driver_idx in $rootScope.drivers) {
            if ($rootScope.drivers[driver_idx].id === driver_id) {
                $scope.driver = $rootScope.drivers[driver_idx];
                break;
            }
        }

        $scope.editDriver = function (driver) {
            $scope.driver = driver;
        }
    }
]);

facetControllers.controller("filesListCtrl", [ "$scope", "$http", "$log", "File"
	function ($scope, $http, File) {
		// FIXME: get the files from the server
	        var files = File.query(function() {
		  $log.log(files);
		});
		
	        $scope.files = [
			{"filename": "/etc/passwd", "type": "other", "size": "1234", "owners": [ "Dropbox" ]},
			{"filename": "backup_my_documents.zip", "type": "other", "size": "10101010", "owners": [ "Secure Shell" ]},
			{"filename": "IMG_2014_001", "type": "picture", "size": "2009", "owners": [ "Local" ]},
			{"filename": "IMG_2014_002", "type": "picture", "size": "3102", "owners": [ "Local" ]},
			{"filename": "IMG_2014_004", "type": "picture", "size": "6082", "owners": [ "Local" ]},
			{"filename": "Justin Bieber - All That Matters {2013-Single}", "type": "music", "size": "7310000", "owners": [ "Local" ]},
			{"filename": "Report Financial Funds 2011-2012", "type": "document", "size": "82002", "owners": [ "Local" ]},
			{"filename": "vacation_north_korea.webm", "type": "video", "size": "304882002", "owners": [ "Google Drive" ]},
		];

        $scope.fileTypeToAwesomeClass = function (filetype) {
            // FIXME: check filetype
            return {
                "picture": "fa-picture-o",
                "video": "fa-film",
                "music": "fa-music",
                "document": "fa-font",
                "other": "fa-file",
            }[filetype];
        }
	}
]);

facetControllers.controller("navbarCtrl", [ "$scope", "$location",
	function ($scope, $location) {
		// XXX: corner case: path == "/", $location.path() == "/smt/1/2/3" will return true
		$scope.isActive = function (path) {
			return $location.path().substr(0, path.length) === path;
		}
	}
]);
