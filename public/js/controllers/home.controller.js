(function () {

  'use strict';

  angular
    .module('chasepn')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['authService'];

  function HomeController(authService) {

    var vm = this;
    vm.authService = authService;

    console.log('in home controller');

    authService.getProfileDeferred().then(function (profile) {
     vm.profile = profile;
   });

   
  }

}());
