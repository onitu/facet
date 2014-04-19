angular = require 'angular'
window._ = require 'lodash'
require 'angular-bootstrap'
require 'angular-ui-router'
require 'restangular'

app = angular.module 'facet', ['ui.bootstrap', 'ui.router', 'restangular']

app.config ($stateProvider, $urlRouterProvider, RestangularProvider) ->
  $urlRouterProvider.otherwise('/files')

  $stateProvider
    .state 'files',
      url: '/files'
      templateUrl: 'partials/files.html'
      controller: 'FilesCtrl'

  RestangularProvider
    .setBaseUrl 'http://localhost:3862/api/v1.0'


app.filter 'bytes', ->
  (bytes) ->
    bytes = parseInt(bytes)
    units = ['KB', 'MB', 'GB', 'TB']
    nb = Math.floor(Math.log(bytes) / Math.log(1024))
    if nb
      (bytes / Math.pow(1024, nb)).toFixed(2) + ' ' + units[nb - 1]
    else
      bytes + ' B'



require './controllers/files'
