(function () {

  'use strict';

  angular
    .module('chasepn')
    .service('authService', authService);

  authService.$inject = ['$q', 'lock', 'authManager', '$location', '$rootScope', '$state'];

  function authService($q, lock, authManager, $location, $rootScope, $state) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
        var deferredProfile = $q.defer();

        if (userProfile) {
          deferredProfile.resolve(userProfile);
        }

        function login() {
          lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
          deferredProfile = $q.defer();
          localStorage.removeItem('id_token');
          localStorage.removeItem('profile');
          authManager.unauthenticate();
          userProfile = null;
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
          lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            authManager.authenticate();

            lock.getProfile(authResult.idToken, function (error, profile) {
              if (error) {
                return console.log(error);
              }

              localStorage.setItem('profile', JSON.stringify(profile));
              userProfile = profile;
              deferredProfile.resolve(profile);
            });

          });
        }

        function getProfileDeferred() {
          return deferredProfile.promise;
        }

        function isAdmin() {
          return userProfile && userProfile.app_metadata
            && userProfile.app_metadata.roles
            && userProfile.app_metadata.roles.indexOf('admin') > -1;
        }

        $rootScope.$on('$stateChangeStart', function(event, nextRoute) {
          if (nextRoute.controller === 'AdminController' || nextRoute.controller === 'rankCtrl' || nextRoute.controller === 'updateRankingsCtrl') {
            if (!isAdmin()) {

              alert('You are not allowed to see the Admin content');
              return event.preventDefault();

            }
          }
        });

        return {
          login: login,
          logout: logout,
          registerAuthenticationListener: registerAuthenticationListener,
          getProfileDeferred: getProfileDeferred
        }
      }


})();
