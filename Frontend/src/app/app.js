/**
 * Created by wrichtsfeld on 30/11/2017.
 */
'use strict'
var config = {
  apiKey: 'AIzaSyDJET3l3DV8itYoTccdhLzv3xQ8JMoiSvU',
  authDomain: 'whiskeytaste-307bd.firebaseapp.com',
  databaseURL: 'https://whiskeytaste-307bd.firebaseio.com',
  projectId: 'whiskeytaste-307bd',
  storageBucket: 'whiskeytaste-307bd.appspot.com',
  messagingSenderId: '960794625142'
}
firebase.initializeApp(config)

angular.module('whiskey.webapp',
  [
    'firebase',
    'ui.router',
    'whiskey.services',
    'whiskey.auth',
    'whiskey.dashboard',
    'whiskey.navigation',
    'whiskey.whiskey',
    'whiskey.loading'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/404') // fallback url
      $stateProvider
        .state('login', {
          url: '/login',
          // template: '<h1> LOGIN </h1>',
          templateUrl: '/app/modules/auth/login.html',
          controller: 'LoginController'
        })
        .state('register', {
          url: '/register',
          // template: '<h1>login.register<h1>'
          templateUrl: 'app/modules/auth/register.html',
          controller: 'LoginController'
        })
        .state('dashboard', {
          url: '/dashboard',
          // template: '<h1>Dashboard</h1>',
          templateUrl: '/app/modules/dashboard/dashboard.html',
          controller: 'DashboardController'
        })
        .state('dashboard.taste', {
          url: '/taste',
          views: {
            'navigation': {
              // template: '<h1>navigation</h1>'
              templateUrl: '/app/modules/navigation/navigation.html',
              controller: 'NavigationController'
            },
            'content': {
              // template: '<h1>whiskeycontent</h1>'
              templateUrl: '/app/modules/whiskey/list.html'
            // controller: 'WhiskeyController'
            }
          }
        })
        .state('dashboard.user', {
          url: '/user',
          views: {
            'navigation': {
              // template: '<h1>navigation</h1>'
              templateUrl: '/app/modules/navigation/navigation.html',
              controller: 'NavigationController'
            },
            'content': {
              template: '<h1>user content</h1>',
            // templateUrl: '/app/modules/whiskey/list.html',
            // controller: 'UserController'
            }
          }
        })

        .state('404', {
          url: '*path',
          templateUrl: '404.html'
        })
    }])
  .controller('AppController', [
    '$state', '$location', '$scope', 'ApplicationService',
    function ($state, $location, $scope, ApplicationService) {}
  ])
  .service('ApplicationService', ['$state', '$location', '$firebaseAuth', function ($state, $location, $firebaseAuth) {
    var user = ''
    var auth = $firebaseAuth()

    return {
      getUser: function () {
        if (user == '') {
          user = localStorage.getItem('userEmail')
        }
        console.log(user)
        return user
      },
      setUser: function (value) {
        localStorage.setItem('userEmail', value)
        user = value
      },
      logoutUser: function () {
        auth.$signOut()
        console.log('Logged Out Succesfully')
        user = ''
        localStorage.removeItem('userEmail')
        $location.path('')
      }
    }
  }]).run([
  '$state',
  'ApplicationService',
  function ($state, ApplicationService) {
    // var user = 
    // console.log(user)
    if (ApplicationService.getUser()) {
      console.log('goto dashboard')
      $state.go('dashboard')
    } else {
      console.log('goto login')
      $state.go('login')
    }
  }])
  /*;(function (orig) {
    angular.modules = []
    angular.module = function () {
      if (arguments.length > 1) {
        angular.modules.push(arguments[0])
      }
      console.log(angular.modules)
      return orig.apply(null, arguments)
    }
  })(angular.module)*/
