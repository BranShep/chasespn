angular.module('chasepn')
    .config(function($locationProvider, $stateProvider, $urlRouterProvider, lockProvider, authProvider, $provide, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

        //This is a catch all for our routes
        $urlRouterProvider.otherwise("/home");

          $stateProvider
            .state('home', {
              url: '/home',
              templateUrl: '/views/home.html',
              controller: 'homeCtrl',
              controllerAs: 'vm'
            })
            .state('update_rankings', {
              url: '/update_rankings',
              templateUrl: '/views/update_rankings.html',
              controller: 'updateRankingsCtrl'
            })
            .state('rank', {
              url: '/rank',
              templateUrl: '/views/rank.html',
              controller: 'rankCtrl'
            })
            .state('facebook', {
              url: '/facebook',
              controller: 'homeCtrl',
              templateUrl: '/views/facebook.html'
            })
            .state('profile', {
              url: '/profile',
              templateUrl: '/views/profile.html',
              controller: 'profileController as user'
            })
            .state('admin', {
              url: '/admin',
               controller: 'homeCtrl',
               templateUrl: '/views/admin.html',
               controllerAs: 'vm'
            });

            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');


            lockProvider.init({
               domain: 'shepinho.auth0.com',
               clientID: 'F2NNe3ImV4h7jGDghIoNyZ3btaEkxrKu'
            });

            // Configuration for angular-jwt
            jwtOptionsProvider.config({
              tokenGetter: function () {
                return localStorage.getItem('id_token');
              }
            });


});

