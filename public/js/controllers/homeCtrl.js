angular.module('chasepn').controller('homeCtrl', function($scope, mainService, $document){
  $scope.test = 'Hello there angular';

  $scope.getFacebook = function() {
      FB.ui({
          method: 'share',
          href: 'http://www.chasespn.com/',
          display: 'popup',
          mobile_iframe: true
      });
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

    document.body.style.overflow = 'hidden';

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
    console.log($scope.show);
  }

  console.log('in home ctrl');

  $scope.d = new Date();
  console.log($scope.d.getMonth());
  if($scope.d.getMonth() === 1 || $scope.d.getMonth() === 2 || $scope.d.getMonth() === 3 || $scope.d.getMonth() === 4 || $scope.d.getMonth() === 5 || $scope.d.getMonth() === 6){
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

  $scope.getTeamsTwo = function(year){
    mainService.getTeamsTwo().then(function(response){
      console.log(response);
      $scope.currentWeek = response.data[0].max;

      var newObj = {
        week: $scope.currentWeek,
        year: year
      }
      mainService.getTeams(newObj).then(function(response){
        $scope.teams = response.data;
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

  $scope.getWeeks = function(){
    mainService.getWeeks().then(function(response){
      console.log(response.data);
      $scope.weeks = response.data;
    })
  }

  $scope.getWeeks();


})
