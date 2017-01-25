angular.module('chasepn').controller('homeCtrl', function($rootScope, $state, authService, $scope, mainService, $document){
  
  $scope.showFacebook = false;
  
  var vm = this;
    vm.authService = authService;

    console.log('in home controller');

    authService.getProfileDeferred().then(function (profile) {
     vm.profile = profile;
   });

  $scope.test = 'Hello there angular';
  console.log('in home');
  $scope.getFacebook = function() {
      FB.ui({
          method: 'share',
          href: 'http://www.chasepn.com/',
          display: 'popup',
          mobile_iframe: true
      });
  }
  
  $scope.sendFacebook = function() {
     var mobile_width = window.matchMedia("(max-width: 480px)");

     if(mobile_width.mathces){
          FB.ui({
            method: 'send',
            link: 'http://www.chasepn.com/',
            mobile_iframe: true,
            display: 'popup'
          });
     }else {
          FB.ui({
            method: 'send',
            link: 'http://www.chasepn.com/',
            mobile_iframe: true,
            display: 'iframe'
          });
     }
  }

  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));

  $scope.show= false;

// $scope.week = 0;


  $scope.enter = function(){
    $scope.weekNumber = $scope.teams[0].weekid;
    $scope.yearNumber = $scope.teams[0].year;
    $scope.commentsTitle = $scope.teams[0].title;
    console.log($scope.teams[0].weekid, $scope.teams[0].year, $scope.teams[0].title);
   if (window.matchMedia("(max-width: 800px)").matches) {
       /* the viewport is at least 400 pixels wide */
       document.body.scrollTop = document.documentElement.scrollTop = 0;
       document.body.style.overflow = 'hidden';
       document.body.style.position = 'fixed';
   } else {
       /* the viewport is less than 400 pixels wide */
   }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1219578184786998',
            xfbml      : true,
            version    : 'v2.2'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    FB.XFBML.parse();
  }


  $scope.exit = function(){
    document.body.style.overflow = 'visible';
    document.body.style.position = 'static';
    console.log($scope.show);
  }

  console.log('in home ctrl');

  $scope.d = new Date();
  console.log($scope.d.getMonth());
  if($scope.d.getMonth() === 0 || $scope.d.getMonth() === 1 || $scope.d.getMonth() === 2 || $scope.d.getMonth() === 3 || $scope.d.getMonth() === 4 || $scope.d.getMonth() === 5){
    $scope.date = ($scope.d.getFullYear() - 1).toString();
    console.log($scope.date);
    var date = $scope.date.slice(2,5);
    var dateTwo = (Number(date) + 1).toString();
    $scope.date = $scope.date + '-' + dateTwo;
  }else {
    $scope.date = $scope.d.getFullYear().toString();
    var date = $scope.date.slice(2,5);
    var dateTwo = (Number(date) + 1).toString();
    $scope.date = $scope.d.getFullYear().toString() + '-' + dateTwo;
  }

  console.log($scope.date);

  $scope.getTeamsTwo = function(year){
    mainService.getTeamsTwoFinal(year).then(function(response){
      console.log(response);
      $scope.currentWeek = response.data[0].max;

      var newObj = {
        week: $scope.currentWeek,
        year: year
      }

      console.log(newObj);
      mainService.getTeamsFinal(newObj).then(function(response){
        $scope.teams = response.data;
        console.log($scope.teams);
      })
    })
  }

  $scope.getTeamsTwo($scope.date);

  $scope.getTeams = function(week){
    var newObj = {
      week: week,
      year: $scope.date
    }
      mainService.getTeams(newObj).then(function(response){
        console.log(response);
        $scope.teams = response.data;
      })
  }

  $scope.getWeeks = function(year){
    mainService.getWeeks(year).then(function(response){
      console.log(response.data);

     var weeksArr = response.data;
     var weeks = [];
     for(var i=0; i < weeksArr.length; i++){
        weeks.push(weeksArr[i].weekid);
     }
     console.log(weeks);
      $scope.weeks = weeks.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      })

      console.log($scope.weeks);
      console.log($scope.weeks.length);
      if ($scope.weeks.length === 1) {
        $scope.weeks[0] = 'None';
        console.log($scope.weeks);
      }
    })
  }

  $scope.getWeeks($scope.date);

  if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {

$('.modal').on('show.bs.modal', function() {

    // Position modal absolute and bump it down to the scrollPosition
    $(this)
    .css({
        position: 'absolute',
        marginTop: $(window).scrollTop() + 'px',
        bottom: 'auto'
    });

    // Position backdrop absolute and make it span the entire page
    //
    // Also dirty, but we need to tap into the backdrop after Boostrap
    // positions it but before transitions finish.
    //
    setTimeout( function() {
    $('.modal-backdrop').css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) + 'px'
    });
    }, 0);
});
}

  $scope.refresh = function() {
   document.body.scrollTop = document.documentElement.scrollTop = 0;
  } 

  $scope.refresh();
  
})
