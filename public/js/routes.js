angular.module('chasepn')
    .config(function($stateProvider, $urlRouterProvider, lockProvider, authProvider, $provide, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {

        //This is a catch all for our routes
        $urlRouterProvider.otherwise("/home");

          $stateProvider
            .state('home', {
              url: '/home',
              templateUrl: '/views/home.html',
              controller: 'HomeController',
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
            .state('login', {
              url: '/login',
              controller: 'LoginController',
              templateUrl: '/views/login.html',
              controllerAs: 'vm'
            })
            .state('profile', {
              url: '/profile',
              templateUrl: '/views/profile.html',
              controller: 'profileController as user'
            })
            .state('admin', {
              url: '/admin',
               controller: 'AdminController',
               templateUrl: '/views/admin.html',
               controllerAs: 'vm'
            });

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
