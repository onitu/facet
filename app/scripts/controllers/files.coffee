angular.module('facet')
  .factory 'Files', (Restangular) ->
    files = Restangular.withConfig (RestangularConfigurer) ->
      RestangularConfigurer.addResponseInterceptor (data, operation) ->
        if operation == 'getList'
          return data['files']

        return data

    list: files.all('files').getList

  .controller 'FilesCtrl', ($scope, $timeout, Files) ->
    (reload = ->
      Files.list().then (data) ->
        $scope.files = data
      $timeout reload, 5000
    )()
