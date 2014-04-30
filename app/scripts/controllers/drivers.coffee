angular.module('facet')
  .factory 'Drivers', (Restangular) ->
    drivers = Restangular.withConfig (RestangularConfigurer) ->
      RestangularConfigurer.addResponseInterceptor (data, operation) ->
        if operation == 'getList'
          return data['entries']

        return data

    list: drivers.all('entries').getList

  .controller 'DriversCtrl', ($scope, $timeout, Drivers) ->
    (reload = ->
      Drivers.list().then (data) ->
        $scope.drivers = data
      $timeout reload, 5000
    )()
