'use strict'
var ngmod = angular.module('whiskey.whiskey', [
  'ui.router',
  'ngDialog'
])
  .controller('WhiskeyController', [
    '$scope',
    '$state',
    '$rootScope',
    '$location',
    function ($scope, $state, $rootScope, $location) {
      // goto taste
      $scope.openWhiskeys = []

      $scope.tasteWhiskey = function () {
        // Taste a whiskey
        console.log('tate whiskey')
      }
      $scope.openWhiskeyBottle = function () {
        // Open a whiskey bottle
        console.log('open whiskey')
      }
    }])
    /*.service('WhiskeyService', [
    '$state',
    function ($state) {
      var self = this
    }
])
*/
