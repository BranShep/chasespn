angular.module("app").service('Analytics', function() {

  this.recordPageview = function(url) {
    ga('set', 'page', url);
    ga('send', 'pageview');
  };

});
