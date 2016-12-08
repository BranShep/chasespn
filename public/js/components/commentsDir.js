angular.module('chasepn').directive('poop', function() {
  return {
    template: '<div id="facebook" class="fb-comments" data-href="https://espn.com/week{{teams[0].weekid}}/{{teams[0].year}}" data-numposts="5"  data-mobile="true"></div> {{week}}'
  };
});
