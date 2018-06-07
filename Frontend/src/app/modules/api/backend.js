angular.module('whiskey.api', []).value('WEBAPP_API_VERSION', '1')
  .service('BackendAPIService', [
    '$http',
    '$q',
    '$host',
    'WEBAPP_API_VERSION',
    function ($http, $q, $host, APIEVAL_API_VERSION) {
      var self = this
      var apiVersion = APIEVAL_API_VERSION
      // ##########################################################
      // ##########################################################
      // Base backend calls
      // ##########################################################
      // ##########################################################
      function addApiVersionToPathIfNotExisting (path) {
        if (!(/^\/?[1-9]\//i).test(path)) {
          // API version not provided -> use the configured one
          if (path.indexOf('/') === 0) {
            path = '/' + apiVersion + path
          } else {
            path = '/' + apiVersion + '/' + path
          }
        }
        return path
      }

      function backendCall (backend, method, path, data, additionalHeaders) {
        path = addApiVersionToPathIfNotExisting(path)

        var requestHeaders = {
          'Content-Type': 'application/json'
        }
        return $q(function (resolve, reject) {
          angular.forEach(additionalHeaders, function (headerValue, headerName) {
            requestHeaders[headerName] = headerValue
          })
          $http({
            url: $host.apiURL(path),
            method: method,
            headers: requestHeaders,
            data: data
          }).then(function (resp) {
            if (!!resp && resp.status !== 200) {
              reject(resp.data)
            } else {
              resolve(resp.data)
            }
          }, function (resp) {
            reject(resp.data)
          })
        }, console.error)
      }

      // all calls without authorization check
      self.post = function (path, data, headers) {
        return backendCall(self, 'POST', path, data, headers)
      }

      self.put = function (path, data, headers) {
        return backendCall(self, 'PUT', path, data, headers)
      }

      self.get = function (path, headers) {
        return backendCall(self, 'GET', path, null, headers)
      }

      self.delete = function (path, headers) {
        return backendCall(self, 'DELETE', path, undefined, headers)
      }

      // ##########################################################
      // ##########################################################
      // List of Backend calls
      // ##########################################################
      // ##########################################################

      // Get all apis
      self.getAPIs = function () {
        return self.get('/apis')
      }

      // update an api title
      self.updateAPITitle = function (apiid, title) {
        return self.put('/apis/' + apiid + '/title', title)
      }

      // Update settings for an api
      self.updateAPISetting = function (apiid, setting) {
        return self.put('/apis/' + apiid + '/settings', setting)
      }

      // Send a new api file to backend
      self.postAPIfile = function (file) {
        return self.post('/files', file)
      }

      // validate an api
      self.validteAPIreport = function (validation) {
        return self.post('/reports/violation', validation)
      }

      // compare two apis
      self.compareAPIReport = function (apiids) {
        return self.post('/reports/comparison', apiids)
      }

      // get all rules for violation report
      self.getRules = function () {
        return self.get('/rules')
      }

      // get settings for an api
      self.getSettings = function () {
        return self.get('/settings')
      }

      // get specific setting
      self.getSetting = function (id) {
        return self.get('/settings/' + id)
      }

      // create a new setting
      self.postSetting = function (settings) {
        return self.post('/settings', settings)
      }

      self.putSetting = function (id, settings) {
        return self.put('/settings/' + id, settings)
      }
    }
  ])
