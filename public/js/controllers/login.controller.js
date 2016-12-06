(function () {
  'use strict';

  angular
    .module('chasepn')
    .controller('LoginController', LoginController);

  function LoginController(authService) {

    var vm = this;

    vm.authService = authService;

  }
})();
