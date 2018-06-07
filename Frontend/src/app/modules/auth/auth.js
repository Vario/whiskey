'use strict'
var ngmod = angular.module('whiskey.auth', [
  'ui.router',
  'ngDialog'
])
  .controller('LoginController', [
    '$scope',
    '$state',
    '$rootScope',
    'LoginService',
    '$location',
    '$firebaseAuth',
    function ($scope, $state, $rootScope, LoginService, $location, $firebaseAuth) {
      console.log('in login')
      $scope.signIn = function () {
        $scope.loading.inc()
        console.log('sign in')
        var username = $scope.user.email
        var password = $scope.user.password
        var auth = $firebaseAuth()
        auth.$signInWithEmailAndPassword(username, password).then(function () {
          console.log('User Login Successful')
          ApplicationService.setUser($scope.user)
          $scope.loading.dec()
          $state.go('dasboard.taste')
        }).catch(function (error) {
          $scope.loading.dec()
          $scope.errMsg = true
          $scope.errorMessage = error.message
        })
      }
      $scope.register = function () {
        $state.go('register', {})
      }
    }]).service('LoginService', [
  '$state',
  function ($state) {}
])
