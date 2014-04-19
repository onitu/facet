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
        console.log data[0]['options_']
        $scope.drivers = data
      $timeout reload, 5000
    )()
