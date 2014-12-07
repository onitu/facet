/*
 * settings.js for onitu
 * by lenorm_f
 */

"use strict";

facetControllers.controller("settingsFormCtrl", [ "$scope", "Restangular",
    function ($scope, Restangular) {
        $scope.endpoint = Restangular.configuration.baseUrl;

        $scope.updateSettings = function () {
            Restangular.setBaseUrl($scope.endpoint);
        }
    }
]);
