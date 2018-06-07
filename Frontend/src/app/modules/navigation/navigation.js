'use strict'
angular.module('whiskey.navigation', [
  'ui.router'
])
  .controller('NavigationController', [
    '$scope',
    '$state',
    'ApplicationService',
    function ($scope, $state, ApplicationService) {
      $scope.logout = function () {
        console.log('logout')
        ApplicationService.logoutUser()
      }
      $scope.taste = function () {
        console.log('taste')
      }
      $scope.user = function () {
        console.log('user')
      }
    }])
