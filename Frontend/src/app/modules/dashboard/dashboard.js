'use strict'
var ngmod = angular.module('whiskey.dashboard', [
  'ui.router',
  'ngDialog'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      console.log('init dashboard')
    }])
  .controller('DashboardController', [
    '$scope',
    '$state',
    '$rootScope',
    '$location',
    'ApplicationService',
    function ($scope, $state, $rootScope, $location, ApplicationService) {
      // goto taste
      console.log('in dashboard')
      $scope.logout = function () {
        console.log('logout')
        ApplicationService.logoutUser()
      // Goto Login
      }
    }])
