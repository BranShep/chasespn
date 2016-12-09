angular.module('chasepn').controller('rankCtrl', function($scope, mainService, $location, $filter){
  $scope.d = new Date();
  var newDate = new Date();
  $scope.dateTwo = newDate.toDateString();
  $scope.dateTwo = $scope.dateTwo.slice(4);
  console.log($scope.dateTwo);
  $scope.dateTwo = $scope.dateTwo.slice(0, 6) + ',' + ' ' + $scope.dateTwo.slice(-4);
  console.log($scope.dateTwo);
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
      $scope.currentWeek = response.data[0].max + 1;
      $scope.previousWeek = response.data[0].max;

      if ($scope.currentWeek === 1) {
        mainService.getAllTeams().then(function(response){
          $scope.teamsTwo = response.data;
        })
      }else{

        var newObj = {
          week: $scope.previousWeek,
          year: year
        }
        mainService.getTeams(newObj).then(function(response){
          console.log(response);
          $scope.teamsTwo = response.data;
        })
      }
    })
  }

  $scope.getTeamsTwo($scope.date);

  $scope.rankingsArr = [];

  $scope.sumbitRankings = function(rankings, week, year, date){
    console.log(rankings);
    console.log(week);

    var weekObj = {
      week: week
    }

    console.log(weekObj);
    mainService.updateWeeks(weekObj).then(function(response){

    })

    for (var i = 0; i <= rankings.length; i++){

      var ranking = Number(rankings[i].ranking);

      if(ranking > (i + 1)){
        var position = '/images/up.png';
      }else if (ranking === (i + 1)){
        var position = '/images/same.png';
      }else if (ranking < (i + 1)){
        var position = '/images/down.png';
      }


      var newObj = {
        teamid: rankings[i].teamid,
        week : week,
        ranking : i + 1,
        previous_ranking : Number(rankings[i].ranking),
        year : year,
        position : position,
        name: rankings[i].name,
        date: date
      };
      $scope.updateRankings(newObj);
    }
  }

  $scope.updateRankings = function(obj) {

    mainService.updateRankings(obj).then(function(response){

      $location.path( "/update_rankings" );
    })
  }


});
