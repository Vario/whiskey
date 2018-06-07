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
    function ($scope, $state, $rootScope, $location) {
      // goto taste
      console.log('in dashboard')
      $state.go('dashboard.taste')
    }])
