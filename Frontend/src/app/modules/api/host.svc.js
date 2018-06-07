'use strict'
angular.module('whiskey.api')
  .factory('$host', [
    '$window',

    function ($window) {
      function Host () {
      }

      function contains (text, search) {
        return text.indexOf(search) > -1
      }

      Host.apiHost = function () {
        if (!!this.host) {
          return this.host
        }
        return 'https://us-central1-whiskeytaste-307bd.cloudfunctions.net/api' // backend api url
      }

      Host.setApiHost = function (host) {
        this.host = host
      }

      Host.apiURL = function (path) {
        var url = this.apiHost() + makeUrlPathAbsolute(path)
        return url
      }

      function makeUrlPathAbsolute (path) {
        var hasPrefix = (path.indexOf('/') === 0)
        return (hasPrefix ? '' : '/') + path
      }

      return Host
    }
  ])
