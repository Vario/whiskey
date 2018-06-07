/**
 * Created by wrichtsfeld on 01/12/2017.
 * Controller which handles the loading overlay to "block" UI
 */
'use strict'
angular.module('whiskey.loading', [])
  .controller('overlayController', ['$scope',
    function ($scope) {
      var loads = 0
      $scope.loading = {
        inc: function () {
          loads++
        },
        dec: function () {
          loads--
        },
        isLoading: function () {
          return loads > 0
        }
      }
      $scope.errors = []
    }])
